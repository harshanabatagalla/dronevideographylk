import { getFeaturedFootage } from "@/lib/db";
import { locations } from "@/lib/content";
import { FlightTrack, type Waypoint } from "./FlightTrack";

/**
 * Server wrapper: builds the flight waypoints from featured footage, enriching
 * each with a location blurb, then hands off to the pinned client experience.
 */
export async function FlightOverIsland() {
  const footage = await getFeaturedFootage();
  const blurbByName = new Map(locations.map((l) => [l.name.toLowerCase(), l.blurb]));

  const waypoints: Waypoint[] = footage.map((f) => ({
    id: f.id,
    title: f.title,
    poster: f.poster,
    location: f.location,
    category: f.category,
    blurb: blurbByName.get(f.location.toLowerCase()) ?? f.title,
  }));

  if (waypoints.length === 0) return null;
  return <FlightTrack waypoints={waypoints} />;
}
