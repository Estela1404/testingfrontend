import React from 'react';
import { Link } from "react-router-dom";

const Home = () => {
  
    const pageBackgroundColor = '#212C3A'; // Color base del fondo
    const patternLineColor = 'hsla(216, 20%, 25%, 0.04)'; // HSL para controlar opacidad fácilmente
    
    const primaryAccentColor = '#2A9D8F'; // Teal
    
    const titleColor = '#FFFFFF';
    const subtitleColor = '#E5E7EB';
    const sloganTextColor = '#B0B8C0';
    const footerTextColor = '#7F8C9A';

    const authButtonTextColor = primaryAccentColor;
    const authButtonBorderColor = primaryAccentColor;
    const authButtonBaseBgColor = 'transparent';
    const authButtonHoverBgColor = 'rgba(42, 157, 143, 0.1)';
    const authButtonActiveBgColor = 'rgba(42, 157, 143, 0.2)';

    const ctaButtonBgColor = primaryAccentColor;
    const ctaButtonTextColor = '#FFFFFF';
    const ctaButtonHoverBgColor = '#25887D';
    const ctaButtonActiveBgColor = '#1F7068';
    // --- Fin Paleta ---

    const backgroundStyle = {
      backgroundColor: pageBackgroundColor,
      // Patrón de líneas diagonales cruzadas y sutiles
      backgroundImage: `
        repeating-linear-gradient(45deg, ${patternLineColor}, ${patternLineColor} 1px, transparent 1px, transparent 40px),
        repeating-linear-gradient(-45deg, ${patternLineColor}, ${patternLineColor} 1px, transparent 1px, transparent 40px)
      `,
      minHeight: '100vh',
      fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    };

    const baseAuthButtonStyle = {
      color: authButtonTextColor,
      border: `2px solid ${authButtonBorderColor}`,
      backgroundColor: authButtonBaseBgColor,
      padding: '0.5rem 1.25rem',
      borderRadius: '6px',
      fontSize: '0.875rem',
      fontWeight: '500',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
    };

    const hoverAuthButtonStyle = { backgroundColor: authButtonHoverBgColor };
    const activeAuthButtonStyle = { backgroundColor: authButtonActiveBgColor };

    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center overflow-x-hidden selection:bg-teal-500 selection:text-white"
        style={backgroundStyle}
      >
        <div className="absolute top-0 right-0 p-4 md:p-6 space-x-3 md:space-x-4 z-10">
          <Link
            to="/login"
            className="transition-all duration-200 ease-in-out"
            style={baseAuthButtonStyle}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverAuthButtonStyle.backgroundColor}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = baseAuthButtonStyle.backgroundColor}
            onMouseDown={(e) => e.currentTarget.style.backgroundColor = activeAuthButtonStyle.backgroundColor}
            onMouseUp={(e) => e.currentTarget.style.backgroundColor = hoverAuthButtonStyle.backgroundColor}
          >
            <span>Login</span>
          </Link>
          <Link
            to="/register"
            className="transition-all duration-200 ease-in-out"
            style={baseAuthButtonStyle}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverAuthButtonStyle.backgroundColor}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = baseAuthButtonStyle.backgroundColor}
            onMouseDown={(e) => e.currentTarget.style.backgroundColor = activeAuthButtonStyle.backgroundColor}
            onMouseUp={(e) => e.currentTarget.style.backgroundColor = hoverAuthButtonStyle.backgroundColor}
          >
            <span>Registro</span>
          </Link>
        </div>

        <main className="w-full max-w-lg md:max-w-xl lg:max-w-2xl mt-12 md:mt-0 relative z-0"> {/* z-0 para que el texto esté sobre el patrón */}
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-3 tracking-tight" style={{ color: titleColor }}>
            Bienvenid@s
          </h1>
          <h2 className="text-4xl sm:text-5xl font-bold mb-10" style={{ color: subtitleColor }}>
            a <span style={{ color: primaryAccentColor }}>CashOptimize</span>
          </h2>
          <p className="text-lg md:text-xl mb-12 px-2 leading-relaxed" style={{ color: sloganTextColor }}>
            ¡Ordena tus finanzas y toma el control de tu dinero!
          </p>
    
          <div className="mt-10">
            <Link
              to="/register" 
              className="inline-flex items-center justify-center px-10 py-3 md:px-12 md:py-4 rounded-md transition-all duration-200 ease-in-out text-lg md:text-xl font-semibold shadow-lg hover:shadow-xl active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent"
              style={{ 
                backgroundColor: ctaButtonBgColor, 
                color: ctaButtonTextColor,
                '--tw-ring-color': primaryAccentColor,
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = ctaButtonHoverBgColor}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ctaButtonBgColor}
              onMouseDown={(e) => e.currentTarget.style.backgroundColor = ctaButtonActiveBgColor}
              onMouseUp={(e) => e.currentTarget.style.backgroundColor = ctaButtonHoverBgColor}
            >
              Empezar Ahora
              <span className="ml-2 text-2xl" aria-hidden="true">→</span>
            </Link>
          </div>
        </main>

        <footer className="absolute bottom-4 left-0 right-0 text-center w-full px-4 z-0">
          <p style={{color: footerTextColor, fontSize: '0.75rem', opacity: 0.9}}>
            CashOptimize &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    );
};

export default Home;