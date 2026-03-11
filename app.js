(() => {
	"use strict";

	const WHATSAPP_NUMBER = "50941773549";
	const EMAIL_TO = "contactoptimistetech@gmail.com";

	const WA_PREFILL =
		"Bonjour%20Garoms-tech,%0AJe%20souhaite%20discuter%20d%E2%80%99un%20projet%20digital.%0APouvez-vous%20me%20contacter%20s%E2%80%99il%20vous%20pla%C3%AEt%20%3F";

	const EMAIL_SUBJECT = "Demande%20de%20projet%20%E2%80%94%20Garoms-tech";
	const EMAIL_BODY =
		"Bonjour%20Garoms-tech,%0D%0A%0D%0AJe%20souhaite%20obtenir%20des%20informations%20sur%20vos%20services.%0D%0A%0D%0ANom%20:%20%0D%0AEntreprise%20:%20%0D%0ABesoin%20:%20%0D%0A%0D%0AMerci.";

	function setContactLinks() {
		const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WA_PREFILL}`;
		const mailUrl = `mailto:${EMAIL_TO}?subject=${EMAIL_SUBJECT}&body=${EMAIL_BODY}`;

		document.querySelectorAll("[data-whatsapp]").forEach((a) => a.setAttribute("href", waUrl));
		document.querySelectorAll("[data-email]").forEach((a) => a.setAttribute("href", mailUrl));
	}

	function navInit() {
		const burger = document.querySelector("[data-burger]");
		const panel = document.querySelector("[data-nav-panel]");
		const closeBtn = document.querySelector("[data-nav-close]");
		const backdrop = document.querySelector("[data-nav-backdrop]");

		if (!burger || !panel || !closeBtn || !backdrop) return;

		const open = () => {
			panel.classList.add("open");
			backdrop.classList.add("open");
			burger.setAttribute("aria-expanded", "true");
			document.documentElement.style.overflow = "hidden";
		};

		const close = () => {
			panel.classList.remove("open");
			backdrop.classList.remove("open");
			burger.setAttribute("aria-expanded", "false");
			document.documentElement.style.overflow = "";
		};

		burger.addEventListener("click", open);
		closeBtn.addEventListener("click", close);
		backdrop.addEventListener("click", close);

		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") close();
		});

		panel.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
	}

	function imageFallbackInit() {
		const fallbackSvg = (label) => {
			const safe = String(label || "Image").slice(0, 40).replace(/[^\w\s\-À-ÿ]/g, "");
			const svg =
				`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">` +
				`<defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#0b1020"/><stop offset="1" stop-color="#070a12"/></linearGradient></defs>` +
				`<rect width="100%" height="100%" fill="url(#g)"/>` +
				`<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="rgba(234,240,255,.78)" font-family="Arial" font-size="44" font-weight="700">${safe}</text>` +
				`</svg>`;
			return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
		};

		document.querySelectorAll("img[data-img]").forEach((img) => {
			const alt = img.getAttribute("alt") || "Image";
			img.addEventListener(
				"error",
				() => {
					img.classList.add("img-fallback");
					img.src = fallbackSvg(alt);
				},
				{ once: true }
			);
		});
	}

	function scrollRevealInit() {
		const nodes = Array.from(document.querySelectorAll(".reveal"));
		if (!nodes.length) return;

		const io = new IntersectionObserver(
			(entries) => {
				for (const en of entries) {
					if (en.isIntersecting) {
						en.target.classList.add("is-visible");
						io.unobserve(en.target);
					}
				}
			},
			{ threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
		);

		nodes.forEach((el) => io.observe(el));
	}

	function countersInit() {
		const nodes = Array.from(document.querySelectorAll(".stat-value[data-count]"));
		if (!nodes.length) return;

		const durationMs = 7000;
		const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

		const start = () => {
			const startTime = performance.now();

			const tick = (now) => {
				const t = Math.min(1, (now - startTime) / durationMs);
				const e = easeOutCubic(t);

				for (const el of nodes) {
					const target = Number(el.getAttribute("data-count")) || 0;
					const value = Math.round(target * e);
					el.textContent = `${value}+`;
				}

				if (t < 1) requestAnimationFrame(tick);
			};

			requestAnimationFrame(tick);
		};

		const section = nodes[0].closest("section") || document.body;
		const io = new IntersectionObserver(
			(entries) => {
				if (entries.some((en) => en.isIntersecting)) {
					io.disconnect();
					start();
				}
			},
			{ threshold: 0.25 }
		);

		io.observe(section);
	}

	// Netlify Forms submit helper
	async function netlifySubmit(form) {
		const formData = new FormData(form);
		const body = new URLSearchParams();
		for (const [k, v] of formData.entries()) body.append(k, String(v));

		const res = await fetch(form.getAttribute("action") || window.location.pathname, {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: body.toString(),
		});

		// Netlify returns 200/302 depending; treat ok as success.
		return res.ok || res.status === 302;
	}

	function bindNetlifyForm(formId, noteId, successMessage) {
		const form = document.getElementById(formId);
		const note = document.getElementById(noteId);
		if (!form || !note) return;

		form.addEventListener("submit", async (e) => {
			e.preventDefault();

			// Basic required check
			const required = Array.from(form.querySelectorAll("[required]"));
			const missing = required.some((el) => !String(el.value || "").trim());
			if (missing) {
				note.textContent = "Veuillez remplir tous les champs obligatoires.";
				return;
			}

			try {
				const ok = await netlifySubmit(form);
				if (!ok) {
					note.textContent = "Une erreur est survenue. Veuillez réessayer.";
					return;
				}
				note.textContent = successMessage;
				form.reset();
			} catch {
				note.textContent = "Une erreur est survenue. Veuillez réessayer.";
			}
		});
	}

	function initForms() {
		bindNetlifyForm(
			"contactForm",
			"formNote",
			"Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais."
		);

		bindNetlifyForm(
			"collabForm",
			"collabNote",
			"Merci pour votre message. Notre équipe analysera votre demande de collaboration et vous contactera si votre profil correspond à nos projets."
		);
	}

	setContactLinks();
	navInit();
	imageFallbackInit();
	scrollRevealInit();
	countersInit();
	initForms();
})();