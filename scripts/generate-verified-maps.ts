import { gameData } from "../src/data/maps";

/**
 * Generates a verified-maps.txt file from the maps.ts data
 * Only includes regions and maps that are marked as verified
 */
function generateVerifiedMapsFile(): string {
  let output = "Region name:\n    Map name\n\n";

  // Filter only verified regions
  const verifiedRegions = gameData.filter((region) => region.verified);

  verifiedRegions.forEach((region) => {
    // Add region name
    output += `${region.name}:\n`;

    // Add all maps in the region (only verified ones if the map has verified flag)
    region.maps.forEach((map) => {
      // Only include the map if it's verified or doesn't have a verified flag (inherit from region)
      if (map.verified !== false) {
        output += `    ${map.name}\n`;
      }
    });

    // Add blank line after each region
    output += "\n";
  });

  return output.trim();
}

// Generate the content
const content = generateVerifiedMapsFile();

// Write to file
const outputPath = "./src/data/verified-maps.txt";
await Bun.write(outputPath, content);

console.log(`✅ Generated ${outputPath}`);
console.log(`\nPreview:\n${content.substring(0, 500)}...`);
