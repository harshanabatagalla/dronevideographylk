/**
 * Credits for the drone photos.
 *
 * These are real photos of each model, used under their Creative Commons
 * licences. Attribution licences require the author and licence to be shown,
 * which the product page and /credits do. DJI's own product photos are NOT
 * used anywhere: they are copyrighted.
 */

export type PhotoCredit = {
  author: string;
  /** Set when the photo shows a different model with the same body. */
  note?: string;
  license: string;
  licenseUrl: string;
  source: string;
};

const PHOTO_CREDITS_BASE: Record<string, PhotoCredit> = {
  "dji-mini-2": { author: "Florian Fuchs", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", source: "https://commons.wikimedia.org/wiki/File:DJI_Mini_2.jpg" },
  "dji-mini-4-pro": { author: "Jacek Halicki", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", source: "https://commons.wikimedia.org/wiki/File:2024_Dron_DJI_Mini_4_Pro_(01).jpg" },
  "dji-mini-3-pro": { author: "Sultan Edijingo", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", source: "https://commons.wikimedia.org/wiki/File:Drone_dji_mini_3_pro.jpg" },
  "dji-air-3": { author: "Jacek Halicki", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", source: "https://commons.wikimedia.org/wiki/File:2024_Dron_DJI_Air_3_(01).jpg" },
  "dji-air-3s": { author: "Jacek Halicki", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", source: "https://commons.wikimedia.org/wiki/File:2024_Dron_DJI_Air_3S_(3).jpg" },
  "dji-air-2s": { author: "Bidgee (Robert Myers)", license: "CC BY-SA 3.0 AU", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/au/", source: "https://commons.wikimedia.org/wiki/File:DJI_Air_2S_in_flight_(cropped).jpg" },
  "dji-mavic-air-2": { author: "C.Stadler/Bwag", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", source: "https://commons.wikimedia.org/wiki/File:DJI_-_Drohne_Mavic_Air_2.JPG" },
  "dji-mavic-2-pro": { author: "SimonWaldherr", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", source: "https://commons.wikimedia.org/wiki/File:DJI_Mavic_2_Pro_with_Hasselblad_Camera_and_DJI_Mavic_Pro.jpg" },
  "dji-mavic-mini": { author: "SimonWaldherr", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", source: "https://commons.wikimedia.org/wiki/File:DJI_Mavic_Mini.jpg" },
  "dji-mavic-3": { author: "C.Stadler/Bwag", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", source: "https://commons.wikimedia.org/wiki/File:DJI_-_Drohne_Mavic_3.JPG" },
  "dji-mavic-3-pro": { author: "A.BourgeoisP", license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/", source: "https://commons.wikimedia.org/wiki/File:2024-10-_DJI_Mavic_3_Pro_-_22.jpg" },
  "dji-mavic-4-pro": { author: "C.Stadler/Bwag", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", source: "https://commons.wikimedia.org/wiki/File:DJI_-_Drohne_Mavic_4_Pro.JPG" },
  "dji-avata-2": { author: "Fumikas Sagisavas", license: "CC0 (public domain)", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/", source: "https://commons.wikimedia.org/wiki/File:DJI_AVATA_2_cropped.jpg" },
  "dji-flip": { author: "Agent Komodo", license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/", source: "https://commons.wikimedia.org/wiki/File:DJI_Flip_et_radiocommande_RC2.jpg" },
};

export const PHOTO_CREDITS: Record<string, PhotoCredit> = {
  ...PHOTO_CREDITS_BASE,
  "dji-mavic-3-classic": { ...PHOTO_CREDITS_BASE["dji-mavic-3"], note: "Photo shows the DJI Mavic 3. The Classic has the same body with one camera." },
  "dji-mini-3": { ...PHOTO_CREDITS_BASE["dji-mini-3-pro"], note: "Photo shows the DJI Mini 3 Pro. The Mini 3 has the same body without the front sensors." },
  "dji-mini-5-pro": { ...PHOTO_CREDITS_BASE["dji-mini-4-pro"], note: "Photo shows the DJI Mini 4 Pro. The Mini 5 Pro has a very similar body." },
  "dji-avata": { ...PHOTO_CREDITS_BASE["dji-avata-2"], note: "Photo shows the DJI Avata 2. The first Avata looks very similar." },
  "dji-fpv": { author: "KKPCW", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", source: "https://commons.wikimedia.org/wiki/File:DJI_FPV_-_1.jpg" },
  "dji-mini-2-se": { author: "Saketh938", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", source: "https://commons.wikimedia.org/wiki/File:DJI_Mini_2_SE_on_a_palm.jpg" },
  "dji-mini-4k": { ...PHOTO_CREDITS_BASE["dji-mini-2"], note: "Photo shows the DJI Mini 2. The Mini 4K uses the same body." },
  "dji-mini-se": { ...PHOTO_CREDITS_BASE["dji-mini-2"], note: "Photo shows the DJI Mini 2. The Mini SE uses the same body." },
  "dji-mavic-3-cine": { ...PHOTO_CREDITS_BASE["dji-mavic-3"], note: "Photo shows the DJI Mavic 3. The Cine model has the same airframe." },
  "dji-mavic-3-pro-cine": { ...PHOTO_CREDITS_BASE["dji-mavic-3-pro"], note: "Photo shows the DJI Mavic 3 Pro. The Pro Cine has the same airframe." },
};

export function getPhotoCredit(slug: string): PhotoCredit | undefined {
  return PHOTO_CREDITS[slug];
}
