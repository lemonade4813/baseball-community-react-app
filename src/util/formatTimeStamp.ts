export function formatTimestamp(timestamp : string) {
    return timestamp.split("T")[0] + " " + timestamp.split("T")[1].split(".")[0];
  }
  
