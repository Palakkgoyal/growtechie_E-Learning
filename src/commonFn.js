function handleScrollToElement(elementId, navigate) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
        navigate('/gallery');
    }
  }

export default handleScrollToElement