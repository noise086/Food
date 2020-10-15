function tabs(tabsSelector, tabContentSelector, tabParentSelector, activeClass) {
    const tabs = document.querySelectorAll(tabsSelector),
          tabContent = document.querySelectorAll(tabContentSelector),
          tabParent = document.querySelector(tabParentSelector);

    function hideTabContent() {
        tabContent.forEach(element => {
            element.classList.add('hide');
            element.classList.remove('fade');
        });

        tabs.forEach(element => {
            element.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        // tabContent[i].style.display = 'block';
        tabContent[i].classList.remove('hide');
        tabContent[i].classList.add('fade');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((tab, i) => {
                if (tab == target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs; 