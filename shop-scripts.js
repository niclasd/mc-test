if (typeof document !== 'undefined') {
document.addEventListener('DOMContentLoaded', () => {

    var totalPointsAvailable = 20; // Gesamtpunktzahl, die der Nutzer ausgeben darf

    // Lightbox-Handler global verfügbar machen (für inline onclick in HTML)
    window.openLightbox = function (src) {
        var lightbox = document.getElementById('lightbox');
        if (!lightbox) return;
        var lightboxImage = lightbox.querySelector('img');
        if (lightboxImage) lightboxImage.src = src;
        lightbox.style.display = 'flex';
        window.scrollTo(0, 0);
    };
    window.closeLightbox = function () {
        var lightbox = document.getElementById('lightbox');
        if (!lightbox) return;
        lightbox.style.display = 'none';
    };

    // 1) Direkt nach dem Laden: aktuellen Warenkorb-/Punktestand aktualisieren
    updateCartTotal();
    updateCartFormData();

    // 2) Event-Listener für "Warenkorb leeren"
    document.getElementById("emptycart").addEventListener("click", emptyCart);

    // 3) Event-Listener für alle "Hinzufügen"-Buttons
    //    -> Wir übergeben das geklickte Button-Element an addToCart(...)
    var btns = document.getElementsByClassName('addtocart');
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', function(event) {
            addToCart(event.currentTarget);
        });
    }

    /* -------------------------------------------------------------------------
       Zeigt ein modales Popup an, z.B. bei Fehlern (keine Farbe gewählt etc.)
       ------------------------------------------------------------------------- */
    function showModal(message) {
        var modal = document.getElementById("modalAlert");
        var closeButton = document.getElementsByClassName("close-button")[0];
        var okButton = document.getElementById("modalOkButton");
        var modalMessage = document.getElementById("modalMessage");

        modalMessage.innerHTML = message;
        modal.style.display = "flex";
window.scrollTo(0, 0); 
        closeButton.onclick = function() {
            modal.style.display = "none";
        };
        okButton.onclick = function() {
            modal.style.display = "none";
        };
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
    }

    /* -------------------------------------------------------------------------
       Artikel in den Warenkorb legen
       - buttonElement: das geklickte Button-DOM-Element
       ------------------------------------------------------------------------- */
    function addToCart(buttonElement) {
        var getpoints;
        var getproductName;
        var getColor = "";
        var getSize = "";
        var cart = [];
        var valid = true; // bleibt nur true, wenn Farb-/Größenwahl ok ist

        // Da wir buttonElement nicht "verlieren" wollen, laufen wir über
        // seine Geschwister (previousSibling), ohne buttonElement selbst
        // zu überschreiben.
        var node = buttonElement.previousSibling;
        while (node) {
            if (node.nodeType === 1) {
                // Price
                if (node.className === "price") {
                    getpoints = node.innerText;  // z.B. "3 Punkte"
                }
                // Produktname
                if (node.className === "productname") {
                    getproductName = node.innerText;
                }
                // Farbe
                if (node.className === "color") {
                    getColor = node.value;
                    if (getColor === "") valid = false;
                }
                // Größe
                if (node.className === "size") {
                    getSize = node.value;
                    if (getSize === "") valid = false;
                }
            }
            node = node.previousSibling;
        }

        // Wenn keine Farbe/Größe gewählt, Abbruch + Meldung
        if (!valid) {
            showModal("Bitte wähle die Farbe und ggf. Größe für das Produkt aus.");
            return; // Keine Animation, kein Hinzufügen
        }

        // Objekt für dieses Produkt
        var product = {
            productname: getproductName,
            price: getpoints,
            color: getColor,
            size: getSize
        };
        var stringProduct = JSON.stringify(product);

        // Hol vorhandenen cart aus SessionStorage
        var cart = sessionStorage.getItem('cart') 
                    ? JSON.parse(sessionStorage.getItem('cart')) 
                    : [];

        // Max. 2 Stück vom selben Produkt?
        var productCount = cart.filter(item => JSON.parse(item).productname === product.productname).length;
        if (productCount >= 2) {
            showModal("Du kannst maximal 2 Stück von jedem Artikel bestellen.");
            return; // Keine Animation
        }

        // Jetzt tatsächlich ins Array pushen
        cart.push(stringProduct);
        sessionStorage.setItem('cart', JSON.stringify(cart));

        // Meldung (oben in #alerts), z.B. "XYZ wurde zum Warenkorb hinzugefügt"
        addedToCart(getproductName);

        // Aktualisieren: Anzeige, Form-Felder, usw.
        updateCartTotal();
        updateCartFormData();

        // **NUR JETZT** Animation am Button starten, weil es erfolgreich war.
        animateAddToCart(buttonElement);
    }

    /* -------------------------------------------------------------------------
       Zeigt eine kurze Nachricht bei erfolgreichem Hinzufügen
       ------------------------------------------------------------------------- */
    function addedToCart(pname) {
        var message = pname + " wurde zum Warenkorb hinzugefügt";
        var alerts = document.getElementById("alerts");
        alerts.innerHTML = message;
        if (!alerts.classList.contains("message")) {
            alerts.classList.add("message");
        }
    }

    /* -------------------------------------------------------------------------
       Animation am Button (Klasse .added => CSS triggert Animation)
       Nach 2 Sekunden zurücksetzen
       ------------------------------------------------------------------------- */
    function animateAddToCart(button) {
        button.classList.add('added');
        setTimeout(() => {
            button.classList.remove('added');
        }, 2000);
    }

    /* -------------------------------------------------------------------------
       Warenkorb total + Tabelle aktualisieren
       ------------------------------------------------------------------------- */
    function updateCartTotal() {
        var totalPointsUsed = 0;
        var items = 0;
        var carttable = "";
        if (sessionStorage.getItem('cart')) {
            var cart = JSON.parse(sessionStorage.getItem('cart'));
            items = cart.length;
            for (var i = 0; i < items; i++) {
                var x = JSON.parse(cart[i]);
                var points = parseInt(x.price.split(' ')[0]); // z.B. "3 Punkte" => 3
                var productDetails = x.productname;
                if (x.color) productDetails += " - Farbe: " + x.color;
                if (x.size) productDetails += " - Größe: " + x.size;
                carttable += "<tr><td>" + productDetails + " - " + points 
                          + " Punkte</td><td><button class='remove-item' data-index='" 
                          + i + "'>X</button></td></tr>";
                totalPointsUsed += points;
            }
        }
        var pointsRemaining = totalPointsAvailable - totalPointsUsed;
        var pointText = (pointsRemaining === 1) ? " Punkt verfügbar" : " Punkte verfügbar";
        
        var totalElement = document.getElementById("total");
        var continueButton = document.querySelector(".generic-button"); 
        var warningMessage = document.getElementById("pointWarning");
        var floatingPointsElement = document.getElementById("floatingPoints");
        
        totalElement.innerHTML = totalPointsUsed + " von " + totalPointsAvailable + " Punkten verwendet";
        document.getElementById("remaining").innerHTML = pointsRemaining + pointText;
        document.getElementById("carttable").innerHTML = carttable;
        document.getElementById("itemsquantity").innerHTML = items;

        // Falls es kein Element mit .generic-button gibt, bitte anpassen.
        if (totalPointsUsed > totalPointsAvailable) {
            totalElement.classList.add("over-max-points");
            if (floatingPointsElement) floatingPointsElement.style.backgroundColor = "#9d0000";
            if (continueButton) continueButton.style.display = "none";
            if (warningMessage) warningMessage.style.display = "block";
        } else {
            totalElement.classList.remove("over-max-points");
            if (floatingPointsElement) floatingPointsElement.style.backgroundColor = "#05164D";
            if (continueButton) continueButton.style.display = "block";
            if (warningMessage) warningMessage.style.display = "none";
        }

        // Remove-Buttons (X) neu binden
        var removeButtons = document.getElementsByClassName('remove-item');
        for (var i = 0; i < removeButtons.length; i++) {
            removeButtons[i].addEventListener('click', function() {
                removeFromCart(this.getAttribute('data-index'));
            });
        }
    }

    /* -------------------------------------------------------------------------
       Aus dem Warenkorb entfernen
       ------------------------------------------------------------------------- */
    function removeFromCart(index) {
        var cart = JSON.parse(sessionStorage.getItem('cart'));
        cart.splice(index, 1);
        sessionStorage.setItem('cart', JSON.stringify(cart));
        updateCartTotal();
        updateCartFormData();
    }

    /* -------------------------------------------------------------------------
       Warenkorb manuell leeren
       ------------------------------------------------------------------------- */
    function emptyCart() {
        if (sessionStorage.getItem('cart')) {
            sessionStorage.removeItem('cart');
            updateCartTotal();
            updateCartFormData();
            var alerts = document.getElementById("alerts");
            alerts.innerHTML = "";
            if (alerts.classList.contains("message")) {
                alerts.classList.remove("message");
            }
        }
    }

    /* -------------------------------------------------------------------------
       Beispielhaftes Checkout (falls benötigt), hier nur per Mailto
       ------------------------------------------------------------------------- */
    function checkout() {
        var cart = sessionStorage.getItem('cart');
        var address = document.getElementById('address').value;
        if (!cart) {
            showModal("Ihr Warenkorb ist leer.");
            return;
        }
        if (!address.trim()) {
            showModal("Bitte geben Sie Ihre Adresse ein.");
            return;
        }
        var totalPointsUsed = calculateTotalPointsUsed(cart);
        if (totalPointsUsed > totalPointsAvailable) {
            showModal("Du hast zu viele Punkte verbraucht. Du kannst maximal " 
                      + totalPointsAvailable + " Punkte ausgeben.");
            return;
        }
        var emailBody = createEmailBody(cart, address);
        window.location.href = "mailto:christian.kierdorf@albatros.de?"
            + "subject=Warenkorb Bestellung&body=" 
            + encodeURIComponent(emailBody);
    }

    function calculateTotalPointsUsed(cart) {
        var totalPointsUsed = 0;
        var cartItems = JSON.parse(cart);
        cartItems.forEach(function(item) {
            var x = JSON.parse(item);
            totalPointsUsed += parseInt(x.price.split(' ')[0]);
        });
        return totalPointsUsed;
    }

    function createEmailBody(cart, address) {
        var emailBody = "Bestellung:\n\n";
        var cartItems = JSON.parse(cart);
        var totalPointsUsed = 0;

        cartItems.forEach(function(item, index) {
            var x = JSON.parse(item);
            var points = parseInt(x.price.split(' ')[0]);
            var itemDetails = (index + 1) + ". " 
                              + x.productname + " - " 
                              + points + " Punkte";
            if (x.color) itemDetails += " - Farbe: " + x.color;
            if (x.size) itemDetails += " - Größe: " + x.size;
            emailBody += itemDetails + "\n";
            totalPointsUsed += points;
        });

        emailBody += "\nGesamtpunktzahl verwendet: " + totalPointsUsed;
        emailBody += "\n\nLieferadresse:\n" + address;
        return emailBody;
    }

    /* -------------------------------------------------------------------------
       Dynamische Erstellung der Input-Felder für Heyflow
       Für jedes Produkt => Artikel1, Artikel2, ...
       Plus extra Input => pointsUsed
       ------------------------------------------------------------------------- */
    function updateCartFormData() {
        const form = document.getElementsByTagName('form')[0];
        if (!form) return; // Falls kein <form> vorhanden ist

        // Entferne alte Artikel-Inputs (falls schon vorhanden)
        const oldProductInputs = form.querySelectorAll('input[name^="Artikel"]');
        oldProductInputs.forEach(input => form.removeChild(input));

        // Entferne auch altes pointsUsed-Input (falls vorhanden)
        const oldPointsUsedInput = document.getElementById('pointsUsed');
        if (oldPointsUsedInput) {
            form.removeChild(oldPointsUsedInput);
        }

        // Hole aktuellen Warenkorb
        const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
        let totalPointsUsed = 0;

        // Lege für jeden Artikel im Warenkorb ein eigenes (verstecktes) Input-Feld an
        cart.forEach((item, index) => {
            const product = JSON.parse(item);

            // Produktdetails für den Input-Value zusammenbauen
            let productDetails = `${product.productname} (${product.price})`;
            if (product.color && product.color.trim() !== "") {
                productDetails += `, Farbe: ${product.color}`;
            }
            if (product.size && product.size.trim() !== "") {
                productDetails += `, Größe: ${product.size}`;
            }

            // Punkte addieren
            totalPointsUsed += parseInt(product.price.split(' ')[0]);

            // Neues Feld, z.B. Artikel1, Artikel2, Artikel3, ...
            const productInput = document.createElement('input');
            productInput.type = 'text';
            productInput.name = `Artikel${index + 1}`;
            productInput.id = `Artikel${index + 1}`;
            productInput.style = "display:none;";
            productInput.setAttribute('data-label', `Artikel${index + 1}`);
            productInput.value = productDetails;

            form.appendChild(productInput);
        });

        // Legt ein eigenes Feld für die Summe der genutzten Punkte an
        const pointsUsedInput = document.createElement('input');
        pointsUsedInput.type = 'text';
        pointsUsedInput.name = 'pointsUsed';
        pointsUsedInput.id = 'pointsUsed';
        pointsUsedInput.style = "display:none;";
        pointsUsedInput.setAttribute('data-label', 'PunkteVerbrauch');
        pointsUsedInput.value = totalPointsUsed;

        form.appendChild(pointsUsedInput);
    }

}); // Ende DOMContentLoaded
}
