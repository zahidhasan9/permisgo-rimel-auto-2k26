"use client";

import { useEffect } from "react";

const translations = {
  en: {
    "Moniteur diplômé": "Certified instructor", "+ 500 d’élève réussites": "500+ successful students", "Certifié Qualiopi": "Qualiopi certified", "Écoles de conduite labellisées": "Accredited driving schools",
  },
  bn: {
    "Offers": "অফার", "Traffic Laws": "ট্রাফিক আইন", "Driving License": "ড্রাইভিং লাইসেন্স", "Contact": "যোগাযোগ", "Appointment": "অ্যাপয়েন্টমেন্ট", "Help": "সহায়তা",
    "Login": "লগইন", "Inscription": "নিবন্ধন", "Follow Us": "আমাদের অনুসরণ করুন",
    "Approved by the prefecture E 25 093 0029 0": "প্রিফেকচার অনুমোদিত E 25 093 0029 0",
    "Comprehensive training, guaranteed safety.": "সম্পূর্ণ প্রশিক্ষণ, নিশ্চিত নিরাপত্তা।", "Start the courses": "কোর্স শুরু করুন",
    "Driving License 13H From": "১৩ ঘণ্টার ড্রাইভিং লাইসেন্স শুরু", "Highway Code from": "হাইওয়ে কোড শুরু", "Permit Offer": "লাইসেন্স অফার",
    "Trust Indicator": "বিশ্বাসের সূচক", "Services": "সেবাসমূহ", "Your driving licence with Permisgo": "PermisGo-এর সাথে আপনার ড্রাইভিং লাইসেন্স",
    "Learn more": "আরও জানুন", "View Other Services": "অন্যান্য সেবা দেখুন", "Location": "অবস্থান", "Permisgo near you": "আপনার কাছেই PermisGo",
    "Lessons near your home, your work, your school… we're everywhere!": "আপনার বাড়ি, কর্মস্থল বা স্কুলের কাছে—আমরা সর্বত্র!",
    "Find lessons based on your vehicle type": "গাড়ির ধরন অনুযায়ী পাঠ খুঁজুন", "Find lessons based on available teacher near you": "কাছাকাছি উপলভ্য প্রশিক্ষক খুঁজুন",
    "Available location and vehicle": "উপলভ্য স্থান ও গাড়ি", "Book Now": "এখনই বুক করুন", "Instructors": "প্রশিক্ষক", "You'll love our instructors": "আমাদের প্রশিক্ষকদের আপনি পছন্দ করবেন",
    "Loading instructors...": "প্রশিক্ষক লোড হচ্ছে...", "No available instructors found.": "কোনো উপলভ্য প্রশিক্ষক পাওয়া যায়নি।", "Message": "বার্তা",
    "Are you a driving instructor? And super friendly?": "আপনি কি একজন বন্ধুসুলভ ড্রাইভিং প্রশিক্ষক?", "Become a freelance driving instructor.": "স্বাধীন ড্রাইভিং প্রশিক্ষক হন।",
    "Join us as a driving instructor": "ড্রাইভিং প্রশিক্ষক হিসেবে যোগ দিন", "FAQ": "সাধারণ প্রশ্ন", "Frequently Asked Question": "প্রায়শই জিজ্ঞাসিত প্রশ্ন",
    "Got a question about lessons, courses, or documents?": "পাঠ, কোর্স বা নথি নিয়ে প্রশ্ন আছে?", "Fill out the form below and we'll respond as soon as possible.": "নিচের ফর্ম পূরণ করুন, আমরা দ্রুত উত্তর দেব।",
    "Get in touch": "যোগাযোগ করুন", "Fill out this form with necessary information": "প্রয়োজনীয় তথ্য দিয়ে ফর্মটি পূরণ করুন",
    "First Name": "নামের প্রথম অংশ", "Last Name": "নামের শেষ অংশ", "Email address": "ইমেইল ঠিকানা", "Phone Number": "ফোন নম্বর", "Submit": "জমা দিন",
    "Secure & Flexible Payment System": "নিরাপদ ও নমনীয় পেমেন্ট ব্যবস্থা", "View All Blogs": "সব ব্লগ দেখুন",
    "Search by address, city...": "ঠিকানা বা শহর দিয়ে খুঁজুন...", "Write name here": "নাম লিখুন", "Write Email address": "ইমেইল লিখুন", "Write phone number": "ফোন নম্বর লিখুন", "Write message": "বার্তা লিখুন",
    "Getting my license quickly, very": "দ্রুত ও সহজে আমার ড্রাইভিং লাইসেন্স", "Contact Information": "যোগাযোগের তথ্য",
    "About": "আমাদের সম্পর্কে", "Partnership Requests": "পার্টনারশিপ অনুরোধ", "Our Service": "আমাদের সেবা",
    "Who are we?": "আমরা কারা?", "Where are we?": "আমরা কোথায়?", "Monitor Privacy Policy": "প্রশিক্ষক গোপনীয়তা নীতি", "Student Privacy Policy": "শিক্ষার্থী গোপনীয়তা নীতি",
    "Manage my cookies": "কুকি পরিচালনা", "Legal Notice": "আইনি বিজ্ঞপ্তি", "Privacy Policy": "গোপনীয়তা নীতি", "General terms & conditions": "সাধারণ শর্তাবলি",
    "Log in to my partner area": "পার্টনার এলাকায় লগইন", "Request for school partnership": "স্কুল পার্টনারশিপ অনুরোধ", "B2B partnership request": "B2B পার্টনারশিপ অনুরোধ",
    "Becoming an independent instructor": "স্বাধীন প্রশিক্ষক হওয়া", "Driving instructor salary": "ড্রাইভিং প্রশিক্ষকের বেতন", "Monitor FAQs": "প্রশিক্ষক FAQ",
    "Frequently Asked Questions": "প্রায়শই জিজ্ঞাসিত প্রশ্ন", "Highway Code Glossary": "হাইওয়ে কোড শব্দকোষ", "Driving licence glossary": "ড্রাইভিং লাইসেন্স শব্দকোষ", "Person with a disability": "প্রতিবন্ধী ব্যক্তিদের জন্য",
    "Terms & Conditions": "শর্তাবলি", "Privacy & Cookies": "গোপনীয়তা ও কুকি", "Refund Policy": "রিফান্ড নীতি", "Disclaimer": "দায়মুক্তি",
    "Monday 10am - 1pm and 3pm - 7pm": "সোমবার সকাল ১০টা–দুপুর ১টা এবং বিকেল ৩টা–সন্ধ্যা ৭টা", "Tuesday 10am - 1pm and 3pm - 7pm": "মঙ্গলবার সকাল ১০টা–দুপুর ১টা এবং বিকেল ৩টা–সন্ধ্যা ৭টা",
    "Wednesday 10am - 1pm and 3pm - 7pm": "বুধবার সকাল ১০টা–দুপুর ১টা এবং বিকেল ৩টা–সন্ধ্যা ৭টা", "Thursday 10am - 1pm and 3pm - 7pm": "বৃহস্পতিবার সকাল ১০টা–দুপুর ১টা এবং বিকেল ৩টা–সন্ধ্যা ৭টা",
    "Friday 10am - 1pm and 3pm - 7pm": "শুক্রবার সকাল ১০টা–দুপুর ১টা এবং বিকেল ৩টা–সন্ধ্যা ৭টা", "Saturday 10am - 1pm and 3pm - 7pm": "শনিবার সকাল ১০টা–দুপুর ১টা এবং বিকেল ৩টা–সন্ধ্যা ৭টা", "Sunday By Appointment": "রবিবার অ্যাপয়েন্টমেন্ট অনুযায়ী",
    "All Right Reserved. Design & Development By": "সর্বস্বত্ব সংরক্ষিত। ডিজাইন ও ডেভেলপমেন্ট:",
    "Moniteur diplômé": "সনদপ্রাপ্ত প্রশিক্ষক", "+ 500 d’élève réussites": "৫০০+ সফল শিক্ষার্থী", "Certifié Qualiopi": "Qualiopi সনদপ্রাপ্ত", "Écoles de conduite labellisées": "স্বীকৃত ড্রাইভিং স্কুল",
    "Manual Transmission": "ম্যানুয়াল ট্রান্সমিশন", "Automatic Transmission": "অটোমেটিক ট্রান্সমিশন", "Accelerated": "দ্রুত প্রশিক্ষণ", "Motorcycle": "মোটরসাইকেল", "Start Searching": "খোঁজা শুরু করুন", "Searching...": "খোঁজা হচ্ছে...",
    "Google Ratings": "গুগল রেটিং", "Trustpilot Ratings": "ট্রাস্টপাইলট রেটিং", "04 out of 05": "৫-এর মধ্যে ৪",
    "Testimonials": "প্রশংসাপত্র", "What Our Students Say": "আমাদের শিক্ষার্থীরা যা বলেন", "Real feedback from learners who trusted our instructors and completed their driving journey with confidence.": "যেসব শিক্ষার্থী আমাদের প্রশিক্ষকদের বিশ্বাস করে আত্মবিশ্বাসের সঙ্গে ড্রাইভিং শেখা সম্পন্ন করেছেন, তাদের বাস্তব মতামত।",
    "Got a question about lessons,": "পাঠ সম্পর্কে কোনো প্রশ্ন আছে?", "courses, or documents?": "কোর্স বা নথি সম্পর্কে?",
    "Accordion Item #1": "প্রশ্ন #১", "Accordion Item #2": "প্রশ্ন #২", "Accordion Item #3": "প্রশ্ন #৩", "Accordion Item #4": "প্রশ্ন #৪", "Accordion Item #5": "প্রশ্ন #৫",
    "This is the first item's accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element.": "এটি প্রথম প্রশ্নের উত্তর। এটি ডিফল্টভাবে খোলা থাকে।",
    "This is the second item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.": "এটি দ্বিতীয় প্রশ্নের উত্তর। এটি ডিফল্টভাবে বন্ধ থাকে।",
    "This is the third item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.": "এটি তৃতীয় প্রশ্নের উত্তর। এটি ডিফল্টভাবে বন্ধ থাকে।",
    "This is the fourth item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.": "এটি চতুর্থ প্রশ্নের উত্তর। এটি ডিফল্টভাবে বন্ধ থাকে।",
    "This is the fifth item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.": "এটি পঞ্চম প্রশ্নের উত্তর। এটি ডিফল্টভাবে বন্ধ থাকে।", "Payment System": "পেমেন্ট ব্যবস্থা",
  },
  fr: {
    "Offers": "Offres", "Traffic Laws": "Code de la route", "Driving License": "Permis de conduire", "Contact": "Contact", "Appointment": "Rendez-vous", "Help": "Aide",
    "Login": "Connexion", "Inscription": "Inscription", "Follow Us": "Suivez-nous",
    "Comprehensive training, guaranteed safety.": "Formation complète, sécurité garantie.", "Start the courses": "Commencer les cours",
    "Driving License 13H From": "Permis de conduire 13 h à partir de", "Highway Code from": "Code de la route à partir de", "Permit Offer": "Offre permis",
    "Trust Indicator": "Indicateur de confiance", "Services": "Services", "Your driving licence with Permisgo": "Votre permis de conduire avec PermisGo",
    "Learn more": "En savoir plus", "View Other Services": "Voir les autres services", "Location": "Localisation", "Permisgo near you": "PermisGo près de chez vous",
    "Lessons near your home, your work, your school… we're everywhere!": "Des cours près de chez vous, de votre travail ou de votre école — nous sommes partout !",
    "Find lessons based on your vehicle type": "Trouvez des cours selon votre type de véhicule", "Find lessons based on available teacher near you": "Trouvez un moniteur disponible près de chez vous",
    "Available location and vehicle": "Lieu et véhicule disponibles", "Book Now": "Réserver", "Instructors": "Moniteurs", "You'll love our instructors": "Vous allez adorer nos moniteurs",
    "Loading instructors...": "Chargement des moniteurs...", "No available instructors found.": "Aucun moniteur disponible.", "Message": "Message",
    "Are you a driving instructor? And super friendly?": "Vous êtes moniteur d’auto-école et très sympathique ?", "Become a freelance driving instructor.": "Devenez moniteur indépendant.",
    "Join us as a driving instructor": "Rejoignez-nous comme moniteur", "FAQ": "FAQ", "Frequently Asked Question": "Questions fréquentes",
    "Got a question about lessons, courses, or documents?": "Une question sur les leçons, les cours ou les documents ?", "Fill out the form below and we'll respond as soon as possible.": "Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.",
    "Get in touch": "Contactez-nous", "Fill out this form with necessary information": "Remplissez ce formulaire avec les informations nécessaires",
    "First Name": "Prénom", "Last Name": "Nom", "Email address": "Adresse e-mail", "Phone Number": "Téléphone", "Submit": "Envoyer",
    "Secure & Flexible Payment System": "Système de paiement sécurisé et flexible", "View All Blogs": "Voir tous les articles",
    "Search by address, city...": "Rechercher par adresse ou ville...", "Write name here": "Écrivez votre nom", "Write Email address": "Écrivez votre e-mail", "Write phone number": "Écrivez votre numéro", "Write message": "Écrivez votre message",
    "Getting my license quickly, very": "Obtenir mon permis rapidement et simplement", "Contact Information": "Coordonnées",
    "About": "À propos", "Partnership Requests": "Demandes de partenariat", "Our Service": "Nos services",
    "Who are we?": "Qui sommes-nous ?", "Where are we?": "Où sommes-nous ?", "Monitor Privacy Policy": "Confidentialité des moniteurs", "Student Privacy Policy": "Confidentialité des élèves",
    "Manage my cookies": "Gérer mes cookies", "Legal Notice": "Mentions légales", "Privacy Policy": "Politique de confidentialité", "General terms & conditions": "Conditions générales",
    "Log in to my partner area": "Connexion à l’espace partenaire", "Request for school partnership": "Demande de partenariat auto-école", "B2B partnership request": "Demande de partenariat B2B",
    "Becoming an independent instructor": "Devenir moniteur indépendant", "Driving instructor salary": "Salaire d’un moniteur", "Monitor FAQs": "FAQ moniteurs",
    "Frequently Asked Questions": "Questions fréquentes", "Highway Code Glossary": "Glossaire du code de la route", "Driving licence glossary": "Glossaire du permis", "Person with a disability": "Personne en situation de handicap",
    "Terms & Conditions": "Conditions générales", "Privacy & Cookies": "Confidentialité et cookies", "Refund Policy": "Politique de remboursement", "Disclaimer": "Clause de non-responsabilité",
    "Monday 10am - 1pm and 3pm - 7pm": "Lundi 10h–13h et 15h–19h", "Tuesday 10am - 1pm and 3pm - 7pm": "Mardi 10h–13h et 15h–19h",
    "Wednesday 10am - 1pm and 3pm - 7pm": "Mercredi 10h–13h et 15h–19h", "Thursday 10am - 1pm and 3pm - 7pm": "Jeudi 10h–13h et 15h–19h",
    "Friday 10am - 1pm and 3pm - 7pm": "Vendredi 10h–13h et 15h–19h", "Saturday 10am - 1pm and 3pm - 7pm": "Samedi 10h–13h et 15h–19h", "Sunday By Appointment": "Dimanche sur rendez-vous",
    "All Right Reserved. Design & Development By": "Tous droits réservés. Conception et développement par",
    "Moniteur diplômé": "Moniteur diplômé", "+ 500 d’élève réussites": "Plus de 500 élèves réussis", "Certifié Qualiopi": "Certifié Qualiopi", "Écoles de conduite labellisées": "Écoles de conduite labellisées",
    "Manual Transmission": "Boîte manuelle", "Automatic Transmission": "Boîte automatique", "Accelerated": "Formation accélérée", "Motorcycle": "Moto", "Start Searching": "Lancer la recherche", "Searching...": "Recherche en cours...",
    "Google Ratings": "Avis Google", "Trustpilot Ratings": "Avis Trustpilot", "04 out of 05": "4 sur 5",
    "Testimonials": "Témoignages", "What Our Students Say": "Ce que disent nos élèves", "Real feedback from learners who trusted our instructors and completed their driving journey with confidence.": "Les témoignages authentiques d’élèves qui ont fait confiance à nos moniteurs et terminé leur parcours avec assurance.",
    "Got a question about lessons,": "Une question sur les leçons,", "courses, or documents?": "les cours ou les documents ?",
    "Accordion Item #1": "Question n°1", "Accordion Item #2": "Question n°2", "Accordion Item #3": "Question n°3", "Accordion Item #4": "Question n°4", "Accordion Item #5": "Question n°5",
    "This is the first item's accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element.": "Voici la réponse à la première question. Elle est ouverte par défaut.",
    "This is the second item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.": "Voici la réponse à la deuxième question. Elle est fermée par défaut.",
    "This is the third item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.": "Voici la réponse à la troisième question. Elle est fermée par défaut.",
    "This is the fourth item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.": "Voici la réponse à la quatrième question. Elle est fermée par défaut.",
    "This is the fifth item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.": "Voici la réponse à la cinquième question. Elle est fermée par défaut.", "Payment System": "Système de paiement",
  },
};

const translateRoot = (root, language) => {
  const dictionary = translations[language] || {};
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (node.parentElement?.closest("script,style,[data-no-translate]")) continue;
    if (node._permisgoOriginal === undefined) node._permisgoOriginal = node.nodeValue;
    const original = node._permisgoOriginal;
    const trimmed = original.trim();
    const translated = dictionary[trimmed];
    const nextValue = translated ? original.replace(trimmed, translated) : original;
    if (node.nodeValue !== nextValue) node.nodeValue = nextValue;
  }
  root.querySelectorAll("[placeholder]:not([data-no-translate] [placeholder])").forEach((element) => {
    if (!element.dataset.originalPlaceholder) element.dataset.originalPlaceholder = element.placeholder;
    element.placeholder = dictionary[element.dataset.originalPlaceholder] || element.dataset.originalPlaceholder;
  });
};

export default function HomeStaticTranslator() {
  useEffect(() => {
    const root = document.querySelector("[data-public-site]");
    if (!root) return;
    let language = localStorage.getItem("permisgo-language") || "en";
    document.documentElement.lang = language;
    translateRoot(root, language);
    const observer = new MutationObserver((mutations) => {
      if (mutations.some((mutation) => mutation.addedNodes.length)) translateRoot(root, language);
    });
    observer.observe(root, { childList: true, subtree: true });
    const onLanguage = (event) => { language = event.detail || "en"; document.documentElement.lang = language; translateRoot(root, language); };
    window.addEventListener("permisgo-language-change", onLanguage);
    return () => { observer.disconnect(); window.removeEventListener("permisgo-language-change", onLanguage); };
  }, []);
  return null;
}
