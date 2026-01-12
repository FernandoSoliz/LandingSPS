/**
 * Sistema de gestión de cookies y consentimiento
 * Cumple con la Ley N° 29733 - Ley de Protección de Datos Personales del Perú
 */

(function() {
  'use strict';

  const COOKIE_CONSENT_NAME = 'sapiens_cookie_consent';
  const COOKIE_EXPIRY_DAYS = 365;
  const STORAGE_KEY = 'sapiens_cookie_consent_storage'; // Respaldo con localStorage

  /**
   * Guarda una cookie y también en localStorage como respaldo
   */
  function setCookie(name, value, days) {
    try {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      const expires = 'expires=' + date.toUTCString();
      
      // Intentar guardar en cookie
      document.cookie = name + '=' + encodeURIComponent(value) + ';' + expires + ';path=/;SameSite=Lax';
      
      // También guardar en localStorage como respaldo
      if (typeof(Storage) !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, value);
        localStorage.setItem(STORAGE_KEY + '_expires', date.getTime().toString());
      }
    } catch (e) {
      console.error('Error al guardar cookie:', e);
    }
  }

  /**
   * Obtiene el valor de una cookie, con respaldo en localStorage
   */
  function getCookie(name) {
    // Primero intentar leer de cookies
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        const value = c.substring(nameEQ.length, c.length);
        const decoded = decodeURIComponent(value);
        // Si encontramos la cookie, también actualizar localStorage
        if (decoded && typeof(Storage) !== 'undefined') {
          try {
            localStorage.setItem(STORAGE_KEY, decoded);
          } catch (e) {
            // Ignorar errores de localStorage
          }
        }
        return decoded;
      }
    }
    
    // Si no se encuentra en cookies, intentar leer de localStorage
    if (typeof(Storage) !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const expires = localStorage.getItem(STORAGE_KEY + '_expires');
        
        if (stored && expires) {
          const expiryTime = parseInt(expires, 10);
          const now = new Date().getTime();
          
          // Si no ha expirado, usar el valor de localStorage
          if (now < expiryTime) {
            // Intentar guardar en cookie también
            const date = new Date(expiryTime);
            const expiresStr = 'expires=' + date.toUTCString();
            document.cookie = name + '=' + encodeURIComponent(stored) + ';' + expiresStr + ';path=/;SameSite=Lax';
            return stored;
          } else {
            // Limpiar si expiró
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem(STORAGE_KEY + '_expires');
          }
        }
      } catch (e) {
        // Ignorar errores de localStorage
      }
    }
    
    return null;
  }

  /**
   * Verifica si el usuario ya dio su consentimiento (aceptado)
   */
  function hasConsent() {
    return getCookie(COOKIE_CONSENT_NAME) === 'accepted';
  }

  /**
   * Verifica si el usuario ya respondió (aceptado o rechazado)
   */
  function hasAnswered() {
    const consent = getCookie(COOKIE_CONSENT_NAME);
    const result = consent === 'accepted' || consent === 'rejected';
    return result;
  }

  /**
   * Guarda el consentimiento del usuario
   */
  function saveConsent(accepted) {
    const value = accepted ? 'accepted' : 'rejected';
    setCookie(COOKIE_CONSENT_NAME, value, COOKIE_EXPIRY_DAYS);
  }

  /**
   * Carga Google Analytics solo si el usuario dio su consentimiento
   */
  function loadGoogleAnalytics() {
    // Verificar si ya está cargado
    if (window.gtag || document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
      return; // Ya está cargado, no hacer nada
    }

    if (hasConsent()) {
      // Cargar el script de Google Analytics
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-D2FY991FT1';
      document.head.appendChild(script1);

      // Inicializar gtag
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-D2FY991FT1');
      window.gtag = gtag;
    }
  }

  /**
   * Muestra el banner de cookies
   */
  function showCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.style.display = 'flex';
      // Animar la aparición
      setTimeout(() => {
        banner.classList.add('cookie-banner-visible');
      }, 10);
    }
  }

  /**
   * Oculta el banner de cookies
   */
  function hideCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.classList.remove('cookie-banner-visible');
      setTimeout(() => {
        banner.style.display = 'none';
      }, 300);
    }
  }

  /**
   * Maneja la aceptación de cookies
   */
  function acceptCookies() {
    saveConsent(true);
    // Verificar que se guardó correctamente
    const saved = getCookie(COOKIE_CONSENT_NAME);
    if (saved === 'accepted') {
      hideCookieBanner();
      loadGoogleAnalytics();
    } else {
      // Si no se guardó, intentar de nuevo
      console.warn('Error al guardar consentimiento, reintentando...');
      setTimeout(() => {
        saveConsent(true);
        hideCookieBanner();
        loadGoogleAnalytics();
      }, 100);
    }
  }

  /**
   * Maneja el rechazo de cookies
   */
  function rejectCookies() {
    saveConsent(false);
    // Verificar que se guardó correctamente
    const saved = getCookie(COOKIE_CONSENT_NAME);
    if (saved === 'rejected') {
      hideCookieBanner();
    } else {
      // Si no se guardó, intentar de nuevo
      console.warn('Error al guardar rechazo, reintentando...');
      setTimeout(() => {
        saveConsent(false);
        hideCookieBanner();
      }, 100);
    }
  }

  /**
   * Inicializa el sistema de cookies
   */
  function initCookieConsent() {
    // Asegurarse de que el banner esté oculto por defecto
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.style.display = 'none';
    }

    // Verificar si el usuario ya respondió (aceptado o rechazado)
    // Hacer una verificación más robusta
    const consentValue = getCookie(COOKIE_CONSENT_NAME);
    const hasAnsweredValue = consentValue === 'accepted' || consentValue === 'rejected';
    
    if (hasAnsweredValue) {
      // Si ya hay consentimiento aceptado, cargar Analytics
      if (consentValue === 'accepted') {
        loadGoogleAnalytics();
      }
      // Si ya respondió (aceptado o rechazado), no mostrar el banner
      return;
    }

    // Si no hay respuesta previa, mostrar el banner
    showCookieBanner();

    // Agregar event listeners a los botones (solo si el banner se muestra)
    const acceptBtn = document.getElementById('cookie-accept');
    const rejectBtn = document.getElementById('cookie-reject');
    const settingsLink = document.getElementById('cookie-settings-link');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', acceptCookies, { once: true });
    }

    if (rejectBtn) {
      rejectBtn.addEventListener('click', rejectCookies, { once: true });
    }

    // El enlace de "Más información" ya tiene su href configurado en el HTML
    // No necesitamos agregar un listener adicional
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieConsent);
  } else {
    initCookieConsent();
  }

  // Exponer funciones útiles globalmente (opcional, para uso futuro)
  window.SapiensCookies = {
    hasConsent: hasConsent,
    acceptCookies: acceptCookies,
    rejectCookies: rejectCookies
  };
})();
