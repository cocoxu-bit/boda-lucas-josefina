/**
 * Smart map helper that detects device platform:
 * - Apple (iPhone, iPad, Mac): opens native Apple Maps app with directions configured
 * - Android & PC: opens native Google Maps app / web with directions configured
 */

export type VenueKey = "monforte" | "veneno";

export const getSmartMapUrl = (venue: VenueKey): string => {
  const isApple =
    typeof window !== "undefined" &&
    typeof navigator !== "undefined" &&
    (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));

  if (venue === "monforte") {
    if (isApple) {
      return "https://maps.apple.com/?daddr=Carrer+de+Monforte+1,+46010+Valencia&q=Palacete+de+los+Jardines+de+Monforte";
    }
    return "https://www.google.com/maps/dir/?api=1&destination=Jardines+de+Monforte,+Carrer+de+Monforte,+1,+46010+Valencia";
  }

  // Veneno
  if (isApple) {
    return "https://maps.apple.com/?daddr=Av.+de+Peris+i+Valero+124,+46006+Valencia&q=Veneno+Valencia";
  }
  return "https://www.google.com/maps/dir/?api=1&destination=Veneno,+Av.+de+Peris+i+Valero,+124,+46006+Valencia";
};

export const openSmartMap = (venue: VenueKey) => {
  const url = getSmartMapUrl(venue);
  window.open(url, "_blank", "noopener,noreferrer");
};
