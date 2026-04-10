/* Simple interactive behavior for the static page.
   - Greeting based on current hour
   - Live clock (pt-BR)
   - Click counter persisted in localStorage
*/

(function () {
    'use strict';

    function $(id) {
        return document.getElementById(id);
    }

    function getGreeting(date) {
        var hour = date.getHours();
        if (hour < 12) return 'Bom dia';
        if (hour < 18) return 'Boa tarde';
        return 'Boa noite';
    }

    function formatDateTime(date) {
        // Uses the user's locale formatting; pt-BR is defined by the page lang.
        return date.toLocaleString('pt-BR');
    }

    document.addEventListener('DOMContentLoaded', function () {
        var greetingEl = $('greeting');
        var clockEl = $('clock');
        var countEl = $('count');
        var buttonEl = $('clickButton');

        if (!greetingEl || !clockEl || !countEl || !buttonEl) {
            // If markup changes, fail gracefully.
            return;
        }

        var storageKey = 'clickCount';
        var initialCount = Number(localStorage.getItem(storageKey) || '0');
        if (!Number.isFinite(initialCount) || initialCount < 0) initialCount = 0;

        function render(count) {
            var now = new Date();
            greetingEl.textContent = getGreeting(now) + '!';
            clockEl.textContent = formatDateTime(now);
            countEl.textContent = String(count);
        }

        var count = initialCount;
        render(count);

        var timerId = window.setInterval(function () {
            // Only the time/greeting changes.
            render(count);
        }, 1000);

        buttonEl.addEventListener('click', function () {
            count += 1;
            localStorage.setItem(storageKey, String(count));
            render(count);
        });

        window.addEventListener('beforeunload', function () {
            window.clearInterval(timerId);
        });
    });
})();
