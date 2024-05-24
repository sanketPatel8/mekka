import React, { useEffect } from 'react';

const LanguageSwitcher = () => {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.onerror = () => {
        console.error('Error loading Google Translate script.');
      };
      document.body.appendChild(script);
    };

    window.googleTranslateElementInit = () => {
      try {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,de',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        }, 'google_translate_element');
        console.log('Google Translate initialized successfully.');
      } catch (error) {
        console.error('Error initializing Google Translate:', error);
      }
    };

    addGoogleTranslateScript();

    return () => {
      // Cleanup function to remove the script
      const script = document.querySelector('script[src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]');
      if (script) {
        script.remove();
      }
      if (window.google && window.google.translate) {
        delete window.google.translate;
      }
    };
  }, []);

  return (
    <>
      <div id="google_translate_element"></div>
    </>
  );
}

export default LanguageSwitcher;
