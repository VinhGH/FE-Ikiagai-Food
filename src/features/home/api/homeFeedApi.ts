// ──────────────────────────────────────────────────────────────────
// features/home/api/homeFeedApi.ts
// Re-export từ food API – Home feed dùng chung nguồn dữ liệu
// ──────────────────────────────────────────────────────────────────

export { getFoods as getHomeFeed } from '../../food/api/foodApi';
