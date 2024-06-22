import { GetDistance } from '../type/activity.type';

export default function getDistanceFromLatLonInKm({
  lat1,
  lng1,
  lat2,
  lng2,
}: GetDistance) {
  const R = 6371; // 地球半徑（公里）
  const dLat = deg2rad(lat2 - lat1);
  const dLng = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // 距離（公里）
  return distance;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}
