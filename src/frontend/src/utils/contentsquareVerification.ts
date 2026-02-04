/**
 * Verifies that the Contentsquare tracking script has loaded successfully.
 * Logs success or failure messages to the browser console without breaking the app.
 */
export function verifyContentsquareScript(): void {
  try {
    // Wait for window load to ensure all scripts have had a chance to load
    if (document.readyState === 'complete') {
      checkScript();
    } else {
      window.addEventListener('load', checkScript);
    }
  } catch (error) {
    console.warn('Contentsquare verification encountered an error:', error);
  }
}

function checkScript(): void {
  try {
    // Check if the script tag exists in the DOM
    const scriptTag = document.querySelector(
      'script[src*="contentsquare.net"]'
    );

    if (!scriptTag) {
      console.warn('Contentsquare tracking script tag not found in DOM');
      return;
    }

    // Check if the script resource loaded successfully using Performance API
    if (window.performance && window.performance.getEntriesByType) {
      const resources = window.performance.getEntriesByType('resource');
      const contentsquareResource = resources.find((resource) =>
        resource.name.includes('contentsquare.net')
      );

      if (contentsquareResource) {
        // Check if the resource loaded successfully (duration > 0 typically means success)
        if (
          'duration' in contentsquareResource &&
          contentsquareResource.duration > 0
        ) {
          console.log('✓ Contentsquare tracking script loaded successfully');
        } else {
          console.warn(
            'Contentsquare tracking script may have failed to load (check network tab)'
          );
        }
      } else {
        // Script tag exists but resource not found in performance entries yet
        // This can happen if checked too early, so we'll do a fallback check
        setTimeout(() => {
          const laterResources = window.performance.getEntriesByType('resource');
          const laterCheck = laterResources.find((resource) =>
            resource.name.includes('contentsquare.net')
          );
          if (laterCheck) {
            console.log('✓ Contentsquare tracking script loaded successfully');
          } else {
            console.warn(
              'Contentsquare tracking script failed to load - it may be blocked by an ad blocker or network issue'
            );
          }
        }, 1000);
      }
    } else {
      // Performance API not available, just confirm script tag exists
      console.log(
        '✓ Contentsquare tracking script tag found (Performance API unavailable for detailed verification)'
      );
    }
  } catch (error) {
    console.warn(
      'Contentsquare tracking script verification failed:',
      error
    );
  }
}
