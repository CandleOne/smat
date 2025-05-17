(function() {
  // Default configuration with additional options
  const defaults = {
    address: '58jewbtxe4jU3MnVADuUq6P8rGxqTctR7ZjaWXhNKvDZwqhbYVQw8JvAvRqNYD5P2VuHVVWQkU5Q5cB9yxoGgG9QbRZ3j1q',
    imageUrl: 'https://i.postimg.cc/J0McQ78B/monbartemplate.png',
    containerId: 'monero-donation-container',
    buttonText: 'Copy Address',
    copiedText: 'Copied!',
    buttonColor: '#e57b03',
    copiedColor: '#2196F3',
    width: '600px',
    borderRadius: '8px',
    shadow: '0 2px 10px rgba(0,0,0,0.2)',
    addressFontSize: 'clamp(12px, 1.5vw + 8px, 20px)',
    addressColor: 'black',
    qrCode: false, // New option to show QR code
    darkMode: false // New option for dark theme
  };

  // Main function with enhanced features
  function createMoneroDonationBar(options = {}) {
    // Merge options with defaults
    const config = { ...defaults, ...options };
    
    // Create container if it doesn't exist
    let container = document.getElementById(config.containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = config.containerId;
      document.body.appendChild(container);
    }

    // Clear container
    container.innerHTML = '';

    // Style the container with improved responsive design
    Object.assign(container.style, {
      position: 'relative',
      width: '90%',
      maxWidth: config.width,
      minWidth: '280px', // Slightly smaller minimum width
      boxSizing: 'border-box',
      margin: '20px auto',
      fontFamily: 'Arial, sans-serif'
    });

    // Apply dark mode if enabled
    if (config.darkMode) {
      config.addressColor = '#ffffff';
      config.buttonColor = '#4a6fa5';
      config.copiedColor = '#4caf50';
    }

    // Create image container for better control
    const imageContainer = document.createElement('div');
    Object.assign(imageContainer.style, {
      position: 'relative',
      width: '100%',
      borderRadius: config.borderRadius,
      overflow: 'hidden',
      boxShadow: config.shadow
    });

    // Create image with error handling
    const img = document.createElement('img');
    img.src = config.imageUrl;
    img.alt = 'Monero Donation Background';
    img.onerror = () => {
      img.style.backgroundColor = config.darkMode ? '#2a2a2a' : '#f5f5f5';
      img.style.display = 'flex';
      img.style.alignItems = 'center';
      img.style.justifyContent = 'center';
      img.style.minHeight = '150px';
      img.innerHTML = '<span>Monero Donation</span>';
    };
    Object.assign(img.style, {
      width: '100%',
      height: 'auto',
      display: 'block',
      transition: 'opacity 0.3s'
    });

    // Create content overlay container
    const overlay = document.createElement('div');
    Object.assign(overlay.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      boxSizing: 'border-box'
    });

    // Create address container with better accessibility
    const addressContainer = document.createElement('div');
    Object.assign(addressContainer.style, {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
      width: '100%',
      maxWidth: '90%'
    });

    // Create address display with improved interaction
    const addressOverlay = document.createElement('div');
    addressOverlay.textContent = config.address;
    addressOverlay.setAttribute('role', 'textbox');
    addressOverlay.setAttribute('aria-label', `Monero donation address: ${config.address}`);
    addressOverlay.setAttribute('tabindex', '0');
    addressOverlay.title = 'Click to copy address';
    Object.assign(addressOverlay.style, {
      color: config.addressColor,
      fontWeight: 'bold',
      textShadow: config.darkMode ? '0 1px 3px rgba(0,0,0,0.8)' : '0 1px 3px rgba(255,255,255,0.8)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      padding: '8px 12px',
      fontSize: config.addressFontSize,
      textAlign: 'center',
      cursor: 'pointer',
      userSelect: 'all',
      width: '100%',
      backgroundColor: config.darkMode ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)',
      borderRadius: '4px',
      transition: 'background-color 0.2s',
      border: 'none',
      outline: 'none'
    });

    // Hover/focus effects
    addressOverlay.addEventListener('mouseenter', () => {
      addressOverlay.style.backgroundColor = config.darkMode ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)';
    });
    addressOverlay.addEventListener('mouseleave', () => {
      addressOverlay.style.backgroundColor = config.darkMode ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)';
    });
    addressOverlay.addEventListener('focus', () => {
      addressOverlay.style.backgroundColor = config.darkMode ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)';
    });
    addressOverlay.addEventListener('blur', () => {
      addressOverlay.style.backgroundColor = config.darkMode ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)';
    });

    // Create copy button with improved interaction
    const copyButton = document.createElement('button');
    copyButton.textContent = config.buttonText;
    copyButton.setAttribute('aria-label', 'Copy Monero address to clipboard');
    Object.assign(copyButton.style, {
      background: config.buttonColor,
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '8px 16px',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'all 0.2s',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      whiteSpace: 'nowrap',
      marginTop: '10px',
      fontWeight: 'bold',
      outline: 'none'
    });

    // Hover/focus effects for button
    copyButton.addEventListener('mouseenter', () => {
      copyButton.style.opacity = '0.9';
      copyButton.style.transform = 'translateY(-1px)';
    });
    copyButton.addEventListener('mouseleave', () => {
      copyButton.style.opacity = '1';
      copyButton.style.transform = 'translateY(0)';
    });
    copyButton.addEventListener('focus', () => {
      copyButton.style.opacity = '0.9';
      copyButton.style.transform = 'translateY(-1px)';
      copyButton.style.boxShadow = `0 0 0 2px ${config.darkMode ? '#4a6fa5' : '#e57b03'}`;
    });
    copyButton.addEventListener('blur', () => {
      copyButton.style.opacity = '1';
      copyButton.style.transform = 'translateY(0)';
      copyButton.style.boxShadow = '0 1px 3px rgba(0,0,0,0.2)';
    });

    // Enhanced copy function with error handling
    async function handleCopy() {
      try {
        await navigator.clipboard.writeText(config.address);
        copyButton.textContent = config.copiedText;
        copyButton.style.background = config.copiedColor;
        
        // Add temporary checkmark icon
        const originalContent = copyButton.innerHTML;
        copyButton.innerHTML = `<span style="margin-right: 5px;">✓</span>${config.copiedText}`;
        
        setTimeout(() => {
          copyButton.textContent = config.buttonText;
          copyButton.innerHTML = originalContent;
          copyButton.style.background = config.buttonColor;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy address:', err);
        copyButton.textContent = 'Error copying';
        copyButton.style.background = '#f44336';
        setTimeout(() => {
          copyButton.textContent = config.buttonText;
          copyButton.style.background = config.buttonColor;
        }, 2000);
      }
    }

    // Add event listeners with keyboard support
    addressOverlay.addEventListener('click', handleCopy);
    addressOverlay.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCopy();
      }
    });
    copyButton.addEventListener('click', handleCopy);

    // QR Code functionality if enabled
    if (config.qrCode) {
      const qrContainer = document.createElement('div');
      qrContainer.style.marginBottom = '15px';
      
      // In a real implementation, you would generate or fetch a QR code here
      const qrPlaceholder = document.createElement('div');
      qrPlaceholder.textContent = '[QR Code Placeholder]';
      qrPlaceholder.style.padding = '10px';
      qrPlaceholder.style.backgroundColor = 'white';
      qrPlaceholder.style.borderRadius = '4px';
      
      qrContainer.appendChild(qrPlaceholder);
      addressContainer.insertBefore(qrContainer, addressOverlay);
    }

    // Tooltip for additional information
    const tooltip = document.createElement('div');
    tooltip.textContent = 'Donate with Monero (XMR)';
    tooltip.style.position = 'absolute';
    tooltip.style.top = '10px';
    tooltip.style.left = '10px';
    tooltip.style.color = config.darkMode ? '#ffffff' : '#000000';
    tooltip.style.backgroundColor = config.darkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)';
    tooltip.style.padding = '4px 8px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.fontSize = '12px';
    tooltip.style.fontWeight = 'bold';
    
    // Build the DOM structure
    addressContainer.appendChild(addressOverlay);
    addressContainer.appendChild(copyButton);
    overlay.appendChild(addressContainer);
    imageContainer.appendChild(img);
    imageContainer.appendChild(overlay);
    imageContainer.appendChild(tooltip);
    container.appendChild(imageContainer);
  }

  // Add to global scope with version info
  window.MoneroDonationBar = { 
    version: '2.0',
    create: createMoneroDonationBar,
    defaults: defaults
  };
})();
