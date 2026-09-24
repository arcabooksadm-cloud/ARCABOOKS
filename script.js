/* =========================================================
   ARCA BOOKS
   ANIMAÇÃO PRINCIPAL
========================================================= */

(function () {

    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const hero =
        document.getElementById(
            "arcabooksHero"
        );


    const logo =
        document.getElementById(
            "arcabooksLogo"
        );


    const phone =
        document.getElementById(
            "arcabooksPhone"
        );


    const app =
        document.getElementById(
            "arcabooksApp"
        );


    const transitionLogo =
        document.getElementById(
            "arcabooksLogoTransition"
        );


    const finalText =
        document.getElementById(
            "arcabooksFinalText"
        );


    const introText =
        document.getElementById(
            "arcabooksIntroText"
        );


    const whiteTransition =
        document.getElementById(
            "arcabooksWhiteTransition"
        );


    let ticking = false;



    /* =====================================================
       UTILITÁRIOS
    ===================================================== */


    function clamp(
        value,
        min,
        max
    ) {

        return Math.min(
            Math.max(
                value,
                min
            ),
            max
        );

    }



    function lerp(
        start,
        end,
        amount
    ) {

        return start +
            (
                end -
                start
            ) *
            amount;

    }



    function easeInOutCubic(
        value
    ) {

        return value < 0.5

            ?

            4 *
            value *
            value *
            value

            :

            1 -
            Math.pow(
                -2 * value + 2,
                3
            ) /
            2;

    }



    function easeOutCubic(
        value
    ) {

        return 1 -
            Math.pow(
                1 - value,
                3
            );

    }



    /* =====================================================
       POSIÇÃO REAL DO ÍCONE
    ===================================================== */

    function getAppTarget() {

        if (!app) return null;

        const rect =
            app.getBoundingClientRect();

        return {

            x:
                rect.left +
                rect.width / 2,

            y:
                rect.top +
                rect.height / 2,

            width:
                rect.width,

            height:
                rect.height

        };

    }



    /* =====================================================
       ATUALIZAÇÃO
    ===================================================== */

    function updateAnimation() {

        if (!hero) {

            ticking = false;

            return;

        }


        const rect =
            hero.getBoundingClientRect();


        const scrollTop =
            window.scrollY || window.pageYOffset;


        const heroTop =
            scrollTop +
            rect.top;


        const heroHeight =
            hero.offsetHeight;


        const viewportHeight =
            window.innerHeight;


        const maxScroll =
            Math.max(
                heroHeight -
                viewportHeight,
                1
            );


        const progress =
            clamp(
                (scrollTop - heroTop) /
                maxScroll,
                0,
                1
            );



        /* =================================================
           FASE 1 — LOGO
        ================================================= */

        const logoProgress =
            clamp(
                progress / 0.22,
                0,
                1
            );


        const logoEase =
            easeInOutCubic(
                logoProgress
            );


        if (logo) {

            const logoRotate =
                lerp(
                    0,
                    360,
                    logoEase
                );


            const logoScale =
                lerp(
                    0.78,
                    1,
                    logoEase
                );


            logo.style.transform =
                `
                translate3d(
                    -50%,
                    -50%,
                    0
                )
                rotateX(
                    ${logoRotate}deg
                )
                scale(
                    ${logoScale}
                )
                `;


            logo.style.opacity =
                String(
                    clamp(
                        logoProgress * 2,
                        0,
                        1
                    )
                );

        }



        /* =================================================
           TEXTO DE ABERTURA
        ================================================= */

        const introProgress =
            clamp(
                (progress - 0.10) /
                0.18,
                0,
                1
            );


        const introEase =
            easeOutCubic(
                introProgress
            );


        if (introText) {

            introText.style.opacity =
                String(
                    introEase
                );


            introText.style.transform =
                `
                translate3d(
                    -50%,
                    ${lerp(
                        18,
                        0,
                        introEase
                    )}px,
                    0
                )
                `;


            introText.style.filter =
                `
                blur(
                    ${lerp(
                        8,
                        0,
                        introEase
                    )}px
                )
                `;


            introText.style.setProperty(
                "--intro-glow-opacity",
                String(
                    clamp(
                        introProgress * 2,
                        0,
                        1
                    )
                )
            );

        }



        /* =================================================
           CELULAR
        ================================================= */

        const phoneProgress =
            clamp(
                (progress - 0.25) /
                0.34,
                0,
                1
            );


        const phoneEase =
            easeOutCubic(
                phoneProgress
            );


        if (phone) {

            const phoneY =
                lerp(
                    115,
                    0,
                    phoneEase
                );


            const phoneScale =
                lerp(
                    0.90,
                    1,
                    phoneEase
                );


            const phoneRotateX =
                lerp(
                    0,
                    0,
                    phoneEase
                );


            const phoneRotateY =
                lerp(
                    0,
                    0,
                    phoneEase
                );


            phone.style.transform =
                `
                translate3d(
                    -50%,
                    calc(
                        -50% +
                        ${phoneY}vh
                    ),
                    0
                )
                rotateX(
                    ${phoneRotateX}deg
                )
                rotateY(
                    ${phoneRotateY}deg
                )
                scale(
                    ${phoneScale}
                )
                `;


            phone.style.opacity =
                String(
                    clamp(
                        phoneProgress * 1.8,
                        0,
                        1
                    )
                );

        }



        /* =================================================
           LOGO DE TRANSIÇÃO
        ================================================= */

        const transitionProgress =
            clamp(
                (progress - 0.53) /
                0.25,
                0,
                1
            );


        const transitionEase =
            easeInOutCubic(
                transitionProgress
            );


        const target =
            getAppTarget();


        if (
            transitionLogo &&
            target
        ) {

            const startX =
                window.innerWidth / 2;


            const startY =
                window.innerHeight / 2;


            const targetX =
                target.x;


            const targetY =
                target.y;


            const x =
                lerp(
                    startX,
                    targetX,
                    transitionEase
                );


            const y =
                lerp(
                    startY,
                    targetY,
                    transitionEase
                );


            const targetSize =
                Math.max(
                    target.width,
                    target.height
                );


            const transitionSize =
                lerp(
                    320,
                    targetSize,
                    transitionEase
                );


            transitionLogo.style.width =
                `${transitionSize}px`;


            transitionLogo.style.height =
                `${transitionSize}px`;


            transitionLogo.style.transform =
                `
                translate3d(
                    ${x - transitionSize / 2}px,
                    ${y - transitionSize / 2}px,
                    0
                )
                scale(
                    ${lerp(
                        1,
                        1.08,
                        transitionEase
                    )}
                )
                `;


            transitionLogo.style.opacity =
                String(
                    transitionProgress
                );

        }



        /* =================================================
           BRILHO / PUMP DO APP
        ================================================= */

        const pumpProgress =
            clamp(
                (progress - 0.77) /
                0.10,
                0,
                1
            );


        if (
            app &&
            transitionProgress > 0.9
        ) {

            const pump =
                1 +
                Math.sin(
                    pumpProgress *
                    Math.PI
                ) *
                0.16;


            app.style.transform =
                `
                scale(
                    ${pump}
                )
                `;

        }



        /* =================================================
           TRANSIÇÃO PARA BRANCO
        ================================================= */

        const whiteProgress =
            clamp(
                (progress - 0.76) /
                0.16,
                0,
                1
            );


        const whiteEase =
            easeInOutCubic(
                whiteProgress
            );


        if (whiteTransition) {

            whiteTransition.style.opacity =
                String(
                    whiteEase
                );

        }



        /* =================================================
           LOGO PRINCIPAL
        ================================================= */

        if (logo) {

            const hideLogo =
                clamp(
                    (progress - 0.30) /
                    0.20,
                    0,
                    1
                );


            logo.style.opacity =
                String(
                    1 - hideLogo
                );

        }



        /* =================================================
           TEXTO FINAL
        ================================================= */

        const finalProgress =
            clamp(
                (progress - 0.80) /
                0.15,
                0,
                1
            );


        const finalEase =
            easeOutCubic(
                finalProgress
            );


        if (finalText) {

            finalText.style.opacity =
                String(
                    finalEase
                );


            finalText.style.transform =
                `
                translateX(-50%)

                translateY(
                    ${lerp(
                        35,
                        0,
                        finalEase
                    )}px
                )
                `;

        }



        ticking = false;

    }



    /* =====================================================
       SCROLL ENGINE
    ===================================================== */


    function requestUpdate() {

        if (!ticking) {

            window.requestAnimationFrame(
                updateAnimation
            );

            ticking = true;

        }

    }



    window.addEventListener(
        "scroll",
        requestUpdate,
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        requestUpdate
    );



    /* =====================================================
       INICIALIZAÇÃO
    ===================================================== */

    window.addEventListener(
        "load",
        function () {

            updateAnimation();

        }
    );


    updateAnimation();


})();



/* =========================================================
   NAVEGAÇÃO + ANIMAÇÕES DAS SEÇÕES
========================================================= */

(function () {

    const root =
        document.getElementById(
            'arcabooksPage'
        );

    if (!root) return;


    const pageNav =
        root.querySelector(
            '#arcabooksPageNav'
        );


    const hero =
        root.querySelector(
            '#arcabooksHero'
        );


    const animatedBlocks =
        root.querySelectorAll(
            '.arcabooks-feature,.arcabooks-device-stage'
        );



    function updatePageNav() {

        if (
            !pageNav ||
            !hero
        ) return;


        pageNav.classList.toggle(
            'is-light',
            hero.getBoundingClientRect().bottom <= 76
        );

    }



    const observer =
        new IntersectionObserver(

            entries =>

                entries.forEach(

                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                'is-visible'
                            );

                        }

                    }

                ),

            {
                threshold: .18,
                rootMargin:
                    '0px 0px -8% 0px'
            }

        );



    animatedBlocks.forEach(
        block =>
            observer.observe(
                block
            )
    );



    root
        .querySelectorAll(
            '.arcabooks-nav-link,.arcabooks-nav-button,.arcabooks-nav-brand'
        )
        .forEach(

            link =>

                link.addEventListener(
                    'click',
                    event => {

                        const href =
                            link.getAttribute(
                                'href'
                            ) || '';


                        if (
                            !href.startsWith('#')
                        ) return;


                        const target =
                            root.querySelector(
                                href
                            );


                        if (!target) return;


                        event.preventDefault();


                        target.scrollIntoView(
                            {
                                behavior:
                                    'smooth',
                                block:
                                    'start'
                            }
                        );

                    }
                )

        );



    window.addEventListener(
        'scroll',
        updatePageNav,
        {
            passive: true
        }
    );


    window.addEventListener(
        'resize',
        updatePageNav
    );


    updatePageNav();

})();



/* =========================================================
   MENU MOBILE
========================================================= */

(function () {

    const root =
        document.getElementById(
            'arcabooksPage'
        );

    if (!root) return;


    const menu =
        document.getElementById(
            'arcabooksMobileMenu'
        );


    const close =
        document.getElementById(
            'arcabooksMobileClose'
        );


    const overlay =
        document.getElementById(
            'arcabooksMobileOverlay'
        );


    const drawer =
        document.getElementById(
            'arcabooksMobileDrawer'
        );


    if (
        !menu ||
        !close ||
        !overlay ||
        !drawer
    ) return;



    function openMenu() {

        root.classList.add(
            'mobile-menu-open'
        );


        menu.setAttribute(
            'aria-expanded',
            'true'
        );


        drawer.setAttribute(
            'aria-hidden',
            'false'
        );

    }



    function closeMenu() {

        root.classList.remove(
            'mobile-menu-open'
        );


        menu.setAttribute(
            'aria-expanded',
            'false'
        );


        drawer.setAttribute(
            'aria-hidden',
            'true'
        );

    }



    menu.addEventListener(
        'click',
        openMenu
    );


    close.addEventListener(
        'click',
        closeMenu
    );


    overlay.addEventListener(
        'click',
        closeMenu
    );


    drawer
        .querySelectorAll('a')
        .forEach(

            a =>
                a.addEventListener(
                    'click',
                    closeMenu
                )

        );


    window.addEventListener(
        'resize',
        () => {

            if (
                innerWidth > 800
            ) {

                closeMenu();

            }

        }
    );

})();
