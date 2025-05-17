(function() {
  // Default configuration
  const defaults = {
    address: '58jewbtxe4jU3MnVADuUq6P8rGxqTctR7ZjaWXhNKvDZwqhbYVQw8JvAvRqNYD5P2VuHVVWQkU5Q5cB9yxoGgG9QbRZ3j1q',
    imageUrl: 'https://i.postimg.cc/J0McQ78B/monbartemplate.png',
    containerId: 'monero-donation-container',
    buttonText: 'Copy Address',
    copiedText: 'Copied!',
    buttonColor: '#e57b03',
    copiedColor: '#2196F3',
    width: '600px'
  };

  // Main function
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

    // Style the container
    Object.assign(container.style, {
      position: 'relative',
      width: '90%',
      maxWidth: config.width,
      minWidth: '300px',
      boxSizing: 'border-box',
      margin: '20px auto'
    });

    // Create image
    const img = document.createElement('img');
    img.src = config.imageUrl;
    img.alt = 'Monero Address Template';
    Object.assign(img.style, {
      width: '100%',
      height: 'auto',
      display: 'block',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
    });

    // Create address overlay
    const addressOverlay = document.createElement('div');
    addressOverlay.textContent = config.address;
    addressOverlay.setAttribute('aria-label', `Monero address: ${config.address}`);
    Object.assign(addressOverlay.style, {
      position: 'absolute',
      top: '44%',
      left: '53%',
      transform: 'translate(-50%, -50%)',
      color: 'black',
      fontWeight: 'bold',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      padding: '8px 12px',
      boxSizing: 'border-box',
      fontSize: 'clamp(12px, 1.5vw + 8px, 20px)',
      textAlign: 'center',
      cursor: 'pointer',
      userSelect: 'all',
      width: '90%',
      maxWidth: '500px',
    });

    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.textContent = config.buttonText;
    Object.assign(copyButton.style, {
      position: 'absolute',
      top: 'calc(44% + 2.2em)',
      left: '50%',
      transform: 'translateX(-50%)',
      background: config.buttonColor,
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '6px 12px',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'all 0.2s',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      zIndex: '10',
      whiteSpace: 'nowrap',
      marginTop: '5%'
    });

    // Copy function
    function handleCopy() {
      navigator.clipboard.writeText(config.address).then(() => {
        copyButton.textContent = config.copiedText;
        copyButton.style.background = config.copiedColor;
        setTimeout(() => {
          copyButton.textContent = config.buttonText;
          copyButton.style.background = config.buttonColor;
        }, 2000);
      });
    }

    // Add event listeners
    addressOverlay.addEventListener('click', handleCopy);
    copyButton.addEventListener('click', handleCopy);

    // Append elements
    container.appendChild(img);
    container.appendChild(addressOverlay);
    container.appendChild(copyButton);

    // Adjust button position
    const adjustButtonPosition = () => {
      const overlayRect = addressOverlay.getBoundingClientRect();
      const imgRect = img.getBoundingClientRect();
      const buttonTop = overlayRect.bottom - imgRect.top + 8;
      copyButton.style.top = `${buttonTop}px`;
    };
    
    adjustButtonPosition();
    window.addEventListener('resize', adjustButtonPosition);
  }

  // Add to global scope
  window.MoneroDonationBar = { create: createMoneroDonationBar };
})();
