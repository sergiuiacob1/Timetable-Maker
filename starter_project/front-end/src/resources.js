//resources will be the array of all resources from the server
$(document).ready(() => {
    require('./resources.css');

    var getAllResources = function () {
        // Returns all resources, unfiltered
    
        return new Promise((resolve, refuse) => {
            fetch("http://localhost:2222/resources/get", {
                mode: "cors",
            }).then((result) => {
                resolve(result);
            }, (err) => {
                console.log(err);
                refuse(err);
            })
        })
    }
    
    var newResource = function ({ type, name, capacity, dependencies }) {
        // Returns a JSON with success status
    
        return new Promise((resolve, refuse) => {
            fetch("http://localhost:2222/resources/add", {
                method: "POST",
                body: {
                    "type": type,
                    "name": name,
                    "capacity": capacity,
                    "dependencies": dependencies
                },
                mode: "cors"
            }).then((result) => {
                resolve(result.body);
            }, (err) => {
                console.log(err);
                refuse(err);
            });
        });
    }
    
    var updateResource = function ({ id, type, name, capacity, dependencies }) {
        // Returns a JSON with success status
    
        return new Promise((resolve, refuse) => {
            fetch("http://localhost:2222/resources/update", {
                method: "POST",
                body: {
                    "id": id,
                    "type": type,
                    "name": name,
                    "capacity": capacity,
                    "dependencies": dependencies
                },
                mode: "cors"
            }).then((result) => {
                resolve(result.body);
            }, (err) => {
                console.log(err);
                refuse(err);
            });
        });
    }
    
    var removeResource = function ({ id }) {
        // Returns a JSON with success status
    
        return new Promise((resolve, refuse) => {
            fetch("http://localhost:2222/resources/remove", {
                method: "POST",
                body: {
                    "id": id
                },
                mode: "cors"
            }).then((result) => {
                resolve(result.body);
            }, (err) => {
                console.log(err);
                refuse(err);
            });
        })
    }

    var resources = [];
    getAllResources()
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        console.log(response);
        resources = response.resources;
        for (var i in resources) {
            console.log(resources[i]);
            populateCard(resources[i], i);
        }
    })

    var currentId = '';
    var edited = false;



    //function to create all cards with all resources from the server
    function populateCard(resource, pos) {
        console.log("suntem in populate card");
        var menu = document.createElement('div');
        menu.className = "menu-card";
        menu.innerHTML = "                    <div class=\"menu-card\">\n" +
            "                    <button id=\"demo-menu-lower-left" + pos + "\"\n" +
            "                            class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
            "                        <i class=\"material-icons\">more_vert</i>\n" +
            "                    </button>\n" +
            "                    <ul class=\"mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect\"\n" +
            "                        for=\"demo-menu-lower-left" + pos + "\">\n" +
            "                        <!--to add onclick to elements directly in js you make DivX.addEventListener('click', showInfo(this)). we need functions in order to work-->\n" +
            "                        <li class=\"mdl-menu__item\" onclick=\"openEditForm(this)\">Edit</li>\n" +
            "                        <li class=\"mdl-menu__item mdl-menu__item--full-bleed-divider\" id=\"show-dialog-del\" onclick=\"openDeleteForm(this)\">Delete</li>\n" +
            "                    </ul>\n" +
            "                    </div>";
        console.log(menu);

        var firstDiv = document.createElement('div');
        firstDiv.className = "flex little-margins xs12 sm4 md3 lg3";
        //firstDiv.textContent = resource.capacity
        //firstDiv.style.backgroundColor = "red";

        var myPos = document.createElement('div');
        myPos.className = "pos";
        myPos.innerHTML = pos;
        var Div2 = document.createElement('div');
        Div2.className = "elevation-1";

        var Div3 = document.createElement('div');
        Div3.className = "card";

        var Div4 = document.createElement('div');
        Div4.className = "cars-card card__media";

        var Div5 = document.createElement('div');
        Div5.className = "card__media__content";

        var Div6 = document.createElement('i');
        Div6.className = "icon grey--text font-huge center material-icons";
        Div6.textContent = resource.type

        var Div7 = document.createElement('div');
        Div7.className = "card__title resource-name";
        Div7.textContent = resource.name

        Div8 = document.createElement('div');
        Div8.className = "list list--two-line";

        Div9 = document.createElement('a');
        Div9.className = "list__tile list__tile--link";

        Div10 = document.createElement('div');
        Div10.className = "list__tile__action";

        var Div6 = document.createElement('i');
        Div6.className = "icon grey--text font-huge center material-icons";
        Div6.textContent = resource.type;

        var Div7 = document.createElement('div');
        Div7.className = "card__title resource-name";
        Div7.textContent = resource.name;

        var Div8 = document.createElement('div');
        Div8.className = "list list--two-line";

        var Div9 = document.createElement('a');
        Div9.className = "list__tile list__tile--link";

        var Div10 = document.createElement('div');
        Div10.className = "list__tile__action";

        var Div11 = document.createElement('i');
        Div11.className = "icon indigo--text material-icons";
        if (resource.type == 'classroom') {
            Div11.textContent = 'people';
        }
        else if (resource.type == 'videocam') {
            Div11.textContent = 'videocam';
        }
        else { Div11.textContent = 'laptop'; }


        var Div12 = document.createElement('div');
        Div12.className = "list__tile__content";

        var Div13 = document.createElement('div');
        Div13.className = "list__tile__title";
        Div13.textContent = resource.capacity;

        var Div14 = document.createElement('div');
        Div14.className = "list__tile__sub-title";
        if (resource.type == 'classroom') {
            Div14.textContent = 'Capacity';
        }
        else { Div14.textContent = 'Resource capacity'; }


        var Div15 = document.createElement('div');
        Div15.className = "divider wat divider--inset";

        var Div16 = document.createElement('a');
        Div16.className = "list__tile list__tile--link";

        var Div17 = document.createElement('div');
        Div17.className = "list__tile__action";

        var Div18 = document.createElement('i');
        Div18.className = "icon indigo--text material-icons";
        Div18.textContent = 'people';


        var Div19 = document.createElement('div');
        Div19.className = "list__tile__content";

        var Div20 = document.createElement('div');
        Div20.className = "list__tile__title";
        Div20.textContent = resource.capacity;

        var Div21 = document.createElement('div');
        Div21.className = "list__tile__sub-title";
        Div21.textContent = 'Capacity';

        //more info
        var Div22 = document.createElement('div');
        Div22.className = "card__actions text-xs-center";
        Div22.addEventListener('click', function () {
            console.log("am dat click");
            // dialog.showModal();
            showInfo(this);
            //  dialogInfo.showModal();
        });

        var Div23 = document.createElement('button');
        Div23.className = "more-info-btn btn btn--flat orange--text";


        var Div24 = document.createElement('div');
        Div24.className = "btn__content ";
        Div24.textContent = 'More info';


        firstDiv.appendChild(Div2);
        Div2.appendChild(Div3);
        Div2.appendChild(myPos);
        //menu
        Div3.appendChild(menu);
        //titlu
        Div3.appendChild(Div4);
        Div4.appendChild(Div5);
        Div5.appendChild(Div6);
        Div3.appendChild(Div7);
        Div3.appendChild(Div8);
        //prima linie
        Div8.appendChild(Div9);
        Div9.appendChild(Div10);
        Div10.appendChild(Div11);
        Div9.appendChild(Div12);
        Div12.appendChild(Div13);
        Div12.appendChild(Div14);
        // a doua linie
        Div8.appendChild(Div15);
        Div8.appendChild(Div16);
        Div16.appendChild(Div17);
        Div17.appendChild(Div18);
        Div16.appendChild(Div19);
        Div19.appendChild(Div20);
        Div19.appendChild(Div21);

        //more info
        Div3.appendChild(Div22);
        Div22.appendChild(Div23);
        Div23.appendChild(Div24);

        //firstDiv.appendChild(Div2); //apeleaza primul div din firstDiv
        // firstDiv.appendChild(Div3); //apeleaza al doilea div din firstDiv

        //   console.log("a mers functia");
        var main = document.getElementById("main");
        main.appendChild(firstDiv);
        //add a div like this at the end: <div class="pos"> aici pui variabila pos</div>
    }

    // //making all the cards here
    // for (var i in resources) {
    //     console.log(resources[i]);
    //     populateCard(resources[i], i);
    // }

    //gets the current resource, shows all info about it
    function populateDialogInfo(position) {
        var myResource = resources[position];
        var dialog = document.getElementById('dialog-info');
        dialog.showModal();

        if (dialog.open) {
            //if myResource.type="classroom" blabla... if is videocam bla bla..
            if (myResource.type == "classroom") {
                document.getElementById('title-info').innerHTML = myResource.type; // si tot asa
                document.getElementById('p1').innerHTML = "Name: " + myResource.name;
                document.getElementById('p2').innerHTML = "Capacity: " + myResource.capacity;
            }
            else {
                document.getElementById('title-info').innerHTML = myResource.type;
                document.getElementById('p1').innerHTML = "Name: " + myResource.name;
                document.getElementById('p2').innerHTML = "Resources: " + myResource.capacity;
            }
        }
        console.log("aici construiesti ca mai sus, info despre resursa curenta sunt in var myResource");
        console.log(myResource);
    }

    //dialog-polyfill-----------------------------------------------------------------------------------------------------
    // (function() {

    // nb. This is for IE10 and lower _only_.
    var supportCustomEvent = window.CustomEvent;
    if (!supportCustomEvent || typeof supportCustomEvent === 'object') {
        supportCustomEvent = function CustomEvent(event, x) {
            x = x || {};
            var ev = document.createEvent('CustomEvent');
            ev.initCustomEvent(event, !!x.bubbles, !!x.cancelable, x.detail || null);
            return ev;
        };
        supportCustomEvent.prototype = window.Event.prototype;
    }

    /**
     * @param {Element} el to check for stacking context
     * @return {boolean} whether this el or its parents creates a stacking context
     */
    function createsStackingContext(el) {
        while (el && el !== document.body) {
            var s = window.getComputedStyle(el);
            var invalid = function (k, ok) {
                return !(s[k] === undefined || s[k] === ok);
            }
            if (s.opacity < 1 ||
                invalid('zIndex', 'auto') ||
                invalid('transform', 'none') ||
                invalid('mixBlendMode', 'normal') ||
                invalid('filter', 'none') ||
                invalid('perspective', 'none') ||
                s['isolation'] === 'isolate' ||
                s.position === 'fixed' ||
                s.webkitOverflowScrolling === 'touch') {
                return true;
            }
            el = el.parentElement;
        }
        return false;
    }

    /**
     * Finds the nearest <dialog> from the passed element.
     *
     * @param {Element} el to search from
     * @return {HTMLDialogElement} dialog found
     */
    function findNearestDialog(el) {
        while (el) {
            if (el.localName === 'dialog') {
                return /** @type {HTMLDialogElement} */ (el);
            }
            el = el.parentElement;
        }
        return null;
    }

    /**
     * Blur the specified element, as long as it's not the HTML body element.
     * This works around an IE9/10 bug - blurring the body causes Windows to
     * blur the whole application.
     *
     * @param {Element} el to blur
     */
    function safeBlur(el) {
        if (el && el.blur && el !== document.body) {
            el.blur();
        }
    }

    /**
     * @param {!NodeList} nodeList to search
     * @param {Node} node to find
     * @return {boolean} whether node is inside nodeList
     */
    function inNodeList(nodeList, node) {
        for (var i = 0; i < nodeList.length; ++i) {
            if (nodeList[i] === node) {
                return true;
            }
        }
        return false;
    }

    /**
     * @param {HTMLFormElement} el to check
     * @return {boolean} whether this form has method="dialog"
     */
    function isFormMethodDialog(el) {
        if (!el || !el.hasAttribute('method')) {
            return false;
        }
        return el.getAttribute('method').toLowerCase() === 'dialog';
    }

    /**
     * @param {!HTMLDialogElement} dialog to upgrade
     * @constructor
     */
    function dialogPolyfillInfo(dialog) {
        this.dialog_ = dialog;
        this.replacedStyleTop_ = false;
        this.openAsModal_ = false;

        // Set a11y role. Browsers that support dialog implicitly know this already.
        if (!dialog.hasAttribute('role')) {
            dialog.setAttribute('role', 'dialog');
        }

        dialog.show = this.show.bind(this);
        dialog.showModal = this.showModal.bind(this);
        dialog.close = this.close.bind(this);

        if (!('returnValue' in dialog)) {
            dialog.returnValue = '';
        }

        if ('MutationObserver' in window) {
            var mo = new MutationObserver(this.maybeHideModal.bind(this));
            mo.observe(dialog, { attributes: true, attributeFilter: ['open'] });
        } else {
            // IE10 and below support. Note that DOMNodeRemoved etc fire _before_ removal. They also
            // seem to fire even if the element was removed as part of a parent removal. Use the removed
            // events to force downgrade (useful if removed/immediately added).
            var removed = false;
            var cb = function () {
                removed ? this.downgradeModal() : this.maybeHideModal();
                removed = false;
            }.bind(this);
            var timeout;
            var delayModel = function (ev) {
                if (ev.target !== dialog) { return; }  // not for a child element
                var cand = 'DOMNodeRemoved';
                removed |= (ev.type.substr(0, cand.length) === cand);
                window.clearTimeout(timeout);
                timeout = window.setTimeout(cb, 0);
            };
            ['DOMAttrModified', 'DOMNodeRemoved', 'DOMNodeRemovedFromDocument'].forEach(function (name) {
                dialog.addEventListener(name, delayModel);
            });
        }
        // Note that the DOM is observed inside DialogManager while any dialog
        // is being displayed as a modal, to catch modal removal from the DOM.

        Object.defineProperty(dialog, 'open', {
            set: this.setOpen.bind(this),
            get: dialog.hasAttribute.bind(dialog, 'open')
        });

        this.backdrop_ = document.createElement('div');
        this.backdrop_.className = 'backdrop';
        this.backdrop_.addEventListener('click', this.backdropClick_.bind(this));
    }

    dialogPolyfillInfo.prototype = {

        get dialog() {
            return this.dialog_;
        },

        /**
         * Maybe remove this dialog from the modal top layer. This is called when
         * a modal dialog may no longer be tenable, e.g., when the dialog is no
         * longer open or is no longer part of the DOM.
         */
        maybeHideModal: function () {
            if (this.dialog_.hasAttribute('open') && document.body.contains(this.dialog_)) { return; }
            this.downgradeModal();
        },

        /**
         * Remove this dialog from the modal top layer, leaving it as a non-modal.
         */
        downgradeModal: function () {
            if (!this.openAsModal_) { return; }
            this.openAsModal_ = false;
            this.dialog_.style.zIndex = '';

            // This won't match the native <dialog> exactly because if the user set top on a centered
            // polyfill dialog, that top gets thrown away when the dialog is closed. Not sure it's
            // possible to polyfill this perfectly.
            if (this.replacedStyleTop_) {
                this.dialog_.style.top = '';
                this.replacedStyleTop_ = false;
            }

            // Clear the backdrop and remove from the manager.
            this.backdrop_.parentNode && this.backdrop_.parentNode.removeChild(this.backdrop_);
            dialogPolyfill.dm.removeDialog(this);
        },

        /**
         * @param {boolean} value whether to open or close this dialog
         */
        setOpen: function (value) {
            if (value) {
                this.dialog_.hasAttribute('open') || this.dialog_.setAttribute('open', '');
            } else {
                this.dialog_.removeAttribute('open');
                this.maybeHideModal();  // nb. redundant with MutationObserver
            }
        },

        /**
         * Handles clicks on the fake .backdrop element, redirecting them as if
         * they were on the dialog itself.
         *
         * @param {!Event} e to redirect
         */
        backdropClick_: function (e) {
            if (!this.dialog_.hasAttribute('tabindex')) {
                // Clicking on the backdrop should move the implicit cursor, even if dialog cannot be
                // focused. Create a fake thing to focus on. If the backdrop was _before_ the dialog, this
                // would not be needed - clicks would move the implicit cursor there.
                var fake = document.createElement('div');
                this.dialog_.insertBefore(fake, this.dialog_.firstChild);
                fake.tabIndex = -1;
                fake.focus();
                this.dialog_.removeChild(fake);
            } else {
                this.dialog_.focus();
            }

            var redirectedEvent = document.createEvent('MouseEvents');
            redirectedEvent.initMouseEvent(e.type, e.bubbles, e.cancelable, window,
                e.detail, e.screenX, e.screenY, e.clientX, e.clientY, e.ctrlKey,
                e.altKey, e.shiftKey, e.metaKey, e.button, e.relatedTarget);
            this.dialog_.dispatchEvent(redirectedEvent);
            e.stopPropagation();
        },

        /**
         * Focuses on the first focusable element within the dialog. This will always blur the current
         * focus, even if nothing within the dialog is found.
         */
        focus_: function () {
            // Find element with `autofocus` attribute, or fall back to the first form/tabindex control.
            var target = this.dialog_.querySelector('[autofocus]:not([disabled])');
            if (!target && this.dialog_.tabIndex >= 0) {
                target = this.dialog_;
            }
            if (!target) {
                // Note that this is 'any focusable area'. This list is probably not exhaustive, but the
                // alternative involves stepping through and trying to focus everything.
                var opts = ['button', 'input', 'keygen', 'select', 'textarea'];
                var query = opts.map(function (el) {
                    return el + ':not([disabled])';
                });
                // TODO(samthor): tabindex values that are not numeric are not focusable.
                query.push('[tabindex]:not([disabled]):not([tabindex=""])');  // tabindex != "", not disabled
                target = this.dialog_.querySelector(query.join(', '));
            }
            safeBlur(document.activeElement);
            target && target.focus();
        },

        /**
         * Sets the zIndex for the backdrop and dialog.
         *
         * @param {number} dialogZ
         * @param {number} backdropZ
         */
        updateZIndex: function (dialogZ, backdropZ) {
            if (dialogZ < backdropZ) {
                throw new Error('dialogZ should never be < backdropZ');
            }
            this.dialog_.style.zIndex = dialogZ;
            this.backdrop_.style.zIndex = backdropZ;
        },

        /**
         * Shows the dialog. If the dialog is already open, this does nothing.
         */
        show: function () {
            if (!this.dialog_.open) {
                this.setOpen(true);
                this.focus_();
            }
        },

        /**
         * Show this dialog modally.
         */
        showModal: function () {
            if (this.dialog_.hasAttribute('open')) {
                throw new Error('Failed to execute \'showModal\' on dialog: The element is already open, and therefore cannot be opened modally.');
            }
            if (!document.body.contains(this.dialog_)) {
                throw new Error('Failed to execute \'showModal\' on dialog: The element is not in a Document.');
            }
            if (!dialogPolyfill.dm.pushDialog(this)) {
                throw new Error('Failed to execute \'showModal\' on dialog: There are too many open modal dialogs.');
            }

            if (createsStackingContext(this.dialog_.parentElement)) {
                console.warn('A dialog is being shown inside a stacking context. ' +
                    'This may cause it to be unusable. For more information, see this link: ' +
                    'https://github.com/GoogleChrome/dialog-polyfill/#stacking-context');
            }

            this.setOpen(true);
            this.openAsModal_ = true;

            // Optionally center vertically, relative to the current viewport.
            if (dialogPolyfill.needsCentering(this.dialog_)) {
                dialogPolyfill.reposition(this.dialog_);
                this.replacedStyleTop_ = true;
            } else {
                this.replacedStyleTop_ = false;
            }

            // Insert backdrop.
            this.dialog_.parentNode.insertBefore(this.backdrop_, this.dialog_.nextSibling);

            // Focus on whatever inside the dialog.
            this.focus_();
        },

        /**
         * Closes this HTMLDialogElement. This is optional vs clearing the open
         * attribute, however this fires a 'close' event.
         *
         * @param {string=} opt_returnValue to use as the returnValue
         */
        close: function (opt_returnValue) {
            if (!this.dialog_.hasAttribute('open')) {
                throw new Error('Failed to execute \'close\' on dialog: The element does not have an \'open\' attribute, and therefore cannot be closed.');
            }
            this.setOpen(false);

            // Leave returnValue untouched in case it was set directly on the element
            if (opt_returnValue !== undefined) {
                this.dialog_.returnValue = opt_returnValue;
            }

            // Triggering "close" event for any attached listeners on the <dialog>.
            var closeEvent = new supportCustomEvent('close', {
                bubbles: false,
                cancelable: false
            });
            this.dialog_.dispatchEvent(closeEvent);
        }

    };

    var dialogPolyfill = {};

    dialogPolyfill.reposition = function (element) {
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        var topValue = scrollTop + (window.innerHeight - element.offsetHeight) / 2;
        element.style.top = Math.max(scrollTop, topValue) + 'px';
    };

    dialogPolyfill.isInlinePositionSetByStylesheet = function (element) {
        for (var i = 0; i < document.styleSheets.length; ++i) {
            var styleSheet = document.styleSheets[i];
            var cssRules = null;
            // Some browsers throw on cssRules.
            try {
                cssRules = styleSheet.cssRules;
            } catch (e) { }
            if (!cssRules) { continue; }
            for (var j = 0; j < cssRules.length; ++j) {
                var rule = cssRules[j];
                var selectedNodes = null;
                // Ignore errors on invalid selector texts.
                try {
                    selectedNodes = document.querySelectorAll(rule.selectorText);
                } catch (e) { }
                if (!selectedNodes || !inNodeList(selectedNodes, element)) {
                    continue;
                }
                var cssTop = rule.style.getPropertyValue('top');
                var cssBottom = rule.style.getPropertyValue('bottom');
                if ((cssTop && cssTop !== 'auto') || (cssBottom && cssBottom !== 'auto')) {
                    return true;
                }
            }
        }
        return false;
    };

    dialogPolyfill.needsCentering = function (dialog) {
        var computedStyle = window.getComputedStyle(dialog);
        if (computedStyle.position !== 'absolute') {
            return false;
        }

        // We must determine whether the top/bottom specified value is non-auto.  In
        // WebKit/Blink, checking computedStyle.top == 'auto' is sufficient, but
        // Firefox returns the used value. So we do this crazy thing instead: check
        // the inline style and then go through CSS rules.
        if ((dialog.style.top !== 'auto' && dialog.style.top !== '') ||
            (dialog.style.bottom !== 'auto' && dialog.style.bottom !== '')) {
            return false;
        }
        return !dialogPolyfill.isInlinePositionSetByStylesheet(dialog);
    };

    /**
     * @param {!Element} element to force upgrade
     */
    dialogPolyfill.forceRegisterDialog = function (element) {
        if (window.HTMLDialogElement || element.showModal) {
            console.warn('This browser already supports <dialog>, the polyfill ' +
                'may not work correctly', element);
        }
        if (element.localName !== 'dialog') {
            throw new Error('Failed to register dialog: The element is not a dialog.');
        }
        new dialogPolyfillInfo(/** @type {!HTMLDialogElement} */(element));
    };

    /**
     * @param {!Element} element to upgrade, if necessary
     */
    dialogPolyfill.registerDialog = function (element) {
        if (!element.showModal) {
            dialogPolyfill.forceRegisterDialog(element);
        }
    };

    /**
     * @constructor
     */
    dialogPolyfill.DialogManager = function () {
        /** @type {!Array<!dialogPolyfillInfo>} */
        this.pendingDialogStack = [];

        var checkDOM = this.checkDOM_.bind(this);

        // The overlay is used to simulate how a modal dialog blocks the document.
        // The blocking dialog is positioned on top of the overlay, and the rest of
        // the dialogs on the pending dialog stack are positioned below it. In the
        // actual implementation, the modal dialog stacking is controlled by the
        // top layer, where z-index has no effect.
        this.overlay = document.createElement('div');
        this.overlay.className = '_dialog_overlay';
        this.overlay.addEventListener('click', function (e) {
            this.forwardTab_ = undefined;
            e.stopPropagation();
            checkDOM([]);  // sanity-check DOM
        }.bind(this));

        this.handleKey_ = this.handleKey_.bind(this);
        this.handleFocus_ = this.handleFocus_.bind(this);

        this.zIndexLow_ = 100000;
        this.zIndexHigh_ = 100000 + 150;

        this.forwardTab_ = undefined;

        if ('MutationObserver' in window) {
            this.mo_ = new MutationObserver(function (records) {
                var removed = [];
                records.forEach(function (rec) {
                    for (var i = 0, c; c = rec.removedNodes[i]; ++i) {
                        if (!(c instanceof Element)) {
                            continue;
                        } else if (c.localName === 'dialog') {
                            removed.push(c);
                        }
                        removed = removed.concat(c.querySelectorAll('dialog'));
                    }
                });
                removed.length && checkDOM(removed);
            });
        }
    };

    /**
     * Called on the first modal dialog being shown. Adds the overlay and related
     * handlers.
     */
    dialogPolyfill.DialogManager.prototype.blockDocument = function () {
        document.documentElement.addEventListener('focus', this.handleFocus_, true);
        document.addEventListener('keydown', this.handleKey_);
        this.mo_ && this.mo_.observe(document, { childList: true, subtree: true });
    };

    /**
     * Called on the first modal dialog being removed, i.e., when no more modal
     * dialogs are visible.
     */
    dialogPolyfill.DialogManager.prototype.unblockDocument = function () {
        document.documentElement.removeEventListener('focus', this.handleFocus_, true);
        document.removeEventListener('keydown', this.handleKey_);
        this.mo_ && this.mo_.disconnect();
    };

    /**
     * Updates the stacking of all known dialogs.
     */
    dialogPolyfill.DialogManager.prototype.updateStacking = function () {
        var zIndex = this.zIndexHigh_;

        for (var i = 0, dpi; dpi = this.pendingDialogStack[i]; ++i) {
            dpi.updateZIndex(--zIndex, --zIndex);
            if (i === 0) {
                this.overlay.style.zIndex = --zIndex;
            }
        }

        // Make the overlay a sibling of the dialog itself.
        var last = this.pendingDialogStack[0];
        if (last) {
            var p = last.dialog.parentNode || document.body;
            p.appendChild(this.overlay);
        } else if (this.overlay.parentNode) {
            this.overlay.parentNode.removeChild(this.overlay);
        }
    };

    /**
     * @param {Element} candidate to check if contained or is the top-most modal dialog
     * @return {boolean} whether candidate is contained in top dialog
     */
    dialogPolyfill.DialogManager.prototype.containedByTopDialog_ = function (candidate) {
        while (candidate = findNearestDialog(candidate)) {
            for (var i = 0, dpi; dpi = this.pendingDialogStack[i]; ++i) {
                if (dpi.dialog === candidate) {
                    return i === 0;  // only valid if top-most
                }
            }
            candidate = candidate.parentElement;
        }
        return false;
    };

    dialogPolyfill.DialogManager.prototype.handleFocus_ = function (event) {
        if (this.containedByTopDialog_(event.target)) { return; }

        event.preventDefault();
        event.stopPropagation();
        safeBlur(/** @type {Element} */(event.target));

        if (this.forwardTab_ === undefined) { return; }  // move focus only from a tab key

        var dpi = this.pendingDialogStack[0];
        var dialog = dpi.dialog;
        var position = dialog.compareDocumentPosition(event.target);
        if (position & Node.DOCUMENT_POSITION_PRECEDING) {
            if (this.forwardTab_) {  // forward
                dpi.focus_();
            } else {  // backwards
                document.documentElement.focus();
            }
        } else {
            // TODO: Focus after the dialog, is ignored.
        }

        return false;
    };

    dialogPolyfill.DialogManager.prototype.handleKey_ = function (event) {
        this.forwardTab_ = undefined;
        if (event.keyCode === 27) {
            event.preventDefault();
            event.stopPropagation();
            var cancelEvent = new supportCustomEvent('cancel', {
                bubbles: false,
                cancelable: true
            });
            var dpi = this.pendingDialogStack[0];
            if (dpi && dpi.dialog.dispatchEvent(cancelEvent)) {
                dpi.dialog.close();
            }
        } else if (event.keyCode === 9) {
            this.forwardTab_ = !event.shiftKey;
        }
    };

    /**
     * Finds and downgrades any known modal dialogs that are no longer displayed. Dialogs that are
     * removed and immediately readded don't stay modal, they become normal.
     *
     * @param {!Array<!HTMLDialogElement>} removed that have definitely been removed
     */
    dialogPolyfill.DialogManager.prototype.checkDOM_ = function (removed) {
        // This operates on a clone because it may cause it to change. Each change also calls
        // updateStacking, which only actually needs to happen once. But who removes many modal dialogs
        // at a time?!
        var clone = this.pendingDialogStack.slice();
        clone.forEach(function (dpi) {
            if (removed.indexOf(dpi.dialog) !== -1) {
                dpi.downgradeModal();
            } else {
                dpi.maybeHideModal();
            }
        });
    };

    /**
     * @param {!dialogPolyfillInfo} dpi
     * @return {boolean} whether the dialog was allowed
     */
    dialogPolyfill.DialogManager.prototype.pushDialog = function (dpi) {
        var allowed = (this.zIndexHigh_ - this.zIndexLow_) / 2 - 1;
        if (this.pendingDialogStack.length >= allowed) {
            return false;
        }
        if (this.pendingDialogStack.unshift(dpi) === 1) {
            this.blockDocument();
        }
        this.updateStacking();
        return true;
    };

    /**
     * @param {!dialogPolyfillInfo} dpi
     */
    dialogPolyfill.DialogManager.prototype.removeDialog = function (dpi) {
        var index = this.pendingDialogStack.indexOf(dpi);
        if (index === -1) { return; }

        this.pendingDialogStack.splice(index, 1);
        if (this.pendingDialogStack.length === 0) {
            this.unblockDocument();
        }
        this.updateStacking();
    };

    dialogPolyfill.dm = new dialogPolyfill.DialogManager();
    dialogPolyfill.formSubmitter = null;
    dialogPolyfill.useValue = null;

    /**
     * Installs global handlers, such as click listers and native method overrides. These are needed
     * even if a no dialog is registered, as they deal with <form method="dialog">.
     */
    if (window.HTMLDialogElement === undefined) {

        /**
         * If HTMLFormElement translates method="DIALOG" into 'get', then replace the descriptor with
         * one that returns the correct value.
         */
        var testForm = document.createElement('form');
        testForm.setAttribute('method', 'dialog');
        if (testForm.method !== 'dialog') {
            var methodDescriptor = Object.getOwnPropertyDescriptor(HTMLFormElement.prototype, 'method');
            if (methodDescriptor) {
                // TODO: older iOS and older PhantomJS fail to return the descriptor here
                var realGet = methodDescriptor.get;
                methodDescriptor.get = function () {
                    if (isFormMethodDialog(this)) {
                        return 'dialog';
                    }
                    return realGet.call(this);
                };
                var realSet = methodDescriptor.set;
                methodDescriptor.set = function (v) {
                    if (typeof v === 'string' && v.toLowerCase() === 'dialog') {
                        return this.setAttribute('method', v);
                    }
                    return realSet.call(this, v);
                };
                Object.defineProperty(HTMLFormElement.prototype, 'method', methodDescriptor);
            }
        }

        /**
         * Global 'click' handler, to capture the <input type="submit"> or <button> element which has
         * submitted a <form method="dialog">. Needed as Safari and others don't report this inside
         * document.activeElement.
         */
        document.addEventListener('click', function (ev) {
            dialogPolyfill.formSubmitter = null;
            dialogPolyfill.useValue = null;
            if (ev.defaultPrevented) { return; }  // e.g. a submit which prevents default submission

            var target = /** @type {Element} */ (ev.target);
            if (!target || !isFormMethodDialog(target.form)) { return; }

            var valid = (target.type === 'submit' && ['button', 'input'].indexOf(target.localName) > -1);
            if (!valid) {
                if (!(target.localName === 'input' && target.type === 'image')) { return; }
                // this is a <input type="image">, which can submit forms
                dialogPolyfill.useValue = ev.offsetX + ',' + ev.offsetY;
            }

            var dialog = findNearestDialog(target);
            if (!dialog) { return; }

            dialogPolyfill.formSubmitter = target;
        }, false);

        /**
         * Replace the native HTMLFormElement.submit() method, as it won't fire the
         * submit event and give us a chance to respond.
         */
        var nativeFormSubmit = HTMLFormElement.prototype.submit;
        function replacementFormSubmit() {
            if (!isFormMethodDialog(this)) {
                return nativeFormSubmit.call(this);
            }
            var dialog = findNearestDialog(this);
            dialog && dialog.close();
        }
        HTMLFormElement.prototype.submit = replacementFormSubmit;

        /**
         * Global form 'dialog' method handler. Closes a dialog correctly on submit
         * and possibly sets its return value.
         */
        document.addEventListener('submit', function (ev) {
            var form = /** @type {HTMLFormElement} */ (ev.target);
            if (!isFormMethodDialog(form)) { return; }
            ev.preventDefault();

            var dialog = findNearestDialog(form);
            if (!dialog) { return; }

            // Forms can only be submitted via .submit() or a click (?), but anyway: sanity-check that
            // the submitter is correct before using its value as .returnValue.
            var s = dialogPolyfill.formSubmitter;
            if (s && s.form === form) {
                dialog.close(dialogPolyfill.useValue || s.value);
            } else {
                dialog.close();
            }
            dialogPolyfill.formSubmitter = null;
        }, true);
    }

    dialogPolyfill['forceRegisterDialog'] = dialogPolyfill.forceRegisterDialog;
    dialogPolyfill['registerDialog'] = dialogPolyfill.registerDialog;

    if (typeof define === 'function' && 'amd' in define) {
        // AMD support
        define(function () { return dialogPolyfill; });
    } else if (typeof module === 'object' && typeof module['exports'] === 'object') {
        // CommonJS support
        module['exports'] = dialogPolyfill;
    } else {
        // all others
        window['dialogPolyfill'] = dialogPolyfill;
    }
    // })();



    //dialogs-------------------------------------------------------------------------------------------------------------

    var tempResource = {
        type: '',
        name: '',
        capacity: ''
    };

    var response;

    //dialog form
    var buttonAddResource = document.getElementById('dialog-form-add');
    var dialogAddResource = document.getElementById('dialog-form');
    dialogPolyfill.registerDialog(dialogAddResource);

    buttonAddResource.addEventListener('click', function () {
        dialogAddResource.showModal();
    });


    //vars for dialog info
    var showDialogButton = document.querySelector('more-info-btn');
    var dialogInfo = document.getElementById('dialog-info');
    dialogPolyfill.registerDialog(dialogInfo);
    console.log("showDialogButton");
    console.log(showDialogButton);
    // var infoButtons = document.querySelectorAll('#show-dialog-info');
    // console.log(infoButtons);
    // for(var i in infoButtons){
    //     infoButtons[i].addEventListener('click', function(){
    //         dialog.showModal();
    //     })
    // }

    var dialog = document.getElementById('dialog-info');

    // showDialogButton.addEventListener('click', function () {
    //     dialog.showModal();
    // });
    dialog.querySelector('.close').addEventListener('click', function () {
        dialog.close();
    });

    //vars for delete dialog

    var dialogDel = document.querySelector('#dialog-del');
    dialogPolyfill.registerDialog(dialogDel);

    var showDialogButton = document.querySelector('#show-dialog-del');
    // showDialogButton.addEventListener('click', function() {
    //     dialogDel.showModal();
    // });
    dialogDel.querySelector('.close').addEventListener('click', function () {
        currentId = '';
        dialogDel.close();
    });


    //puts the values in an object, sends it to the server
    //send for editForm as well
    function sendAddForm() {
        tempResource.type = document.getElementById('type').value;
        tempResource.name = document.getElementById('name').value;
        tempResource.capacity = document.getElementById('capacity').value;
        if (edited === true) {
            tempResource.id = currentId;
            //send for edit
            console.log("element send to be edited ");
            console.log(tempResource);

            //update
            response = updateResource(tempResource.id, tempResource.type, tempResource.name, tempResource.capacity);
            console.log(response);
            edited = false;
            currentId = '';
        }
        else {
            //send for add
            response = newResource(tempResource.type, tempResource.name, tempResource.capacity);
            console.log(response);
        }

        console.log("data to be sent..");
        console.log(tempResource);

        document.querySelector('dialog').close();
        tempResource = {
            type: '',
            name: '',
            capacity: ''
        };
        currentId = '';
    }
    function sendDeleteResource() {
        console.log("deleting" + currentId);

        if (currentId) {
            //delete resource
            response = removeResource(currentId);
            console.log(response);
        }
        else {
            console.log("id is null");
        }
        console.log(currentId);
        currentId = '';
        dialogDel.close();
    }
    var dialogForm = document.querySelector('dialog');
    //opens the add form
    function showAddForm() {
        console.log("fct buna");
        var showDialogButton = document.querySelector('#show-dialog');
        if (!dialogForm.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        document.getElementById('form-title').innerHTML = "Add resource";
        document.getElementById('submitBtn').innerHTML = "Add";


        dialogForm.querySelector('.add').addEventListener('click', function () {
            dialog.close;
            edited = false;
        });
        dialogForm.querySelector('.close').addEventListener('click', function () {
            dialogForm.close();
            edited = false;
        });

        console.log("wuuut");
    };

    function openEditForm(elem) {
        edited = true;
        // console.log(elem);
        // console.log("butonul mergeeee");
        dialogAddResource.showModal();
        document.getElementById('form-title').innerHTML = "Edit resource";
        document.getElementById('submitBtn').innerHTML = "Edit";
        var pos = elem.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.lastElementChild.innerHTML;//get the position in the array of our element
        var currentElement = resources[pos];
        console.log("current element");
        console.log(pos);
        console.log(currentElement);
        //   document.querySelector('.mdl-textfield type').MaterialTextfield.change();
        var inputType = document.getElementById('type');

        inputType.value = currentElement.type;
        inputType.parentElement.classList.add('is-dirty'); //the label is not going to come over the text

        document.getElementById('name').value = currentElement.name;
        document.getElementById('name').parentElement.classList.add('is-dirty');

        document.getElementById('capacity').value = currentElement.capacity;
        document.getElementById('capacity').parentElement.classList.add('is-dirty');

        currentId = currentElement.id;

        //dialogForm.showModal();

        console.log('blabla');
    }
    function openDeleteForm(elem) {
        var pos = elem.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.lastElementChild.innerHTML;//get the position in the array of our element
        var dialogDelete = document.querySelector('#dialog-del');
        dialogDelete.showModal();
        var currentElement = resources[pos];
        currentId = currentElement.id;
        //    dialogDel.showModal();
    }


    //knows what is the current element, sends the position of the current resource in the array
    // in order for the populateDialogInfo function to know what info to put in the dialog
    function showInfo(btnElem) {
        console.log("here");
        console.log(btnElem);
        var pos = btnElem.parentElement.parentElement.lastElementChild.innerHTML; //this how to get the position
        console.log(pos);
        populateDialogInfo(pos);
    }

});