/** Alt text for a portfolio photo: what it shows and where, without repeating the place name. */
export function photoAlt(title: string, location: string): string {
  return title.toLowerCase().includes(location.toLowerCase())
    ? `Aerial photo of ${title}, Sri Lanka`
    : `Aerial photo of ${title}, ${location}, Sri Lanka`;
}
