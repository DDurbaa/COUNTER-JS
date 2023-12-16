let activated = false;

    async function updateCount(counter, target) {
        let count = 0;
        const inc = target / 100;
        while (count < target) {
            count += inc;
            counter.innerText = Math.floor(count);
            await new Promise(resolve => setTimeout(resolve, 10));
        }
        counter.innerText = target;
    }
    const counters = document.querySelectorAll(".counters span");
    function startCounting(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !activated) {
                activated = true;
                const promises = Array.from(counters).map((counter) => {
                    const target = parseInt(counter.getAttribute("data-count"));
                    return updateCount(counter, target);
                });
                Promise.all(promises);
                observer.disconnect();
            }
        });
    }
    const options = {
        threshold: 0.5 
    };
    const observer = new IntersectionObserver(startCounting, options);
    counters.forEach(counter => {
        observer.observe(counter);
    });