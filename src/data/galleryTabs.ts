export type GalleryTab = {
  id: string;
  label: string;
  description?: string;
};

export const galleryTabs: GalleryTab[] = [
  {
    id: "figure",
    label: "인체",
    description: "기초 인체 드로잉과 다양한 포즈 연구",
  },
  {
    id: "drawing",
    label: "소묘",
    description: "명암과 질감을 활용한 사실적인 소묘",
  },
  {
    id: "idea",
    label: "발상과 표현",
    description: "아이디어를 시각화하는 창의적 표현",
  },
  {
    id: "stage-design",
    label: "무대 디자인",
    description: "무대를 위한 공간 연출과 콘셉트 작업",
  },
  {
    id: "basic-liberal",
    label: "기초 소양",
    description: "기본 이론과 조형 감각을 기르는 과정",
  },
  {
    id: "basic-design",
    label: "기초 디자인",
    description: "형태와 색채를 활용한 디자인 기초",
  },
  {
    id: "portfolio-1",
    label: "포트폴리오 1",
    description: "포트폴리오 완성을 위한 1단계 작업",
  },
  {
    id: "portfolio-2",
    label: "포트폴리오 2",
    description: "완성도를 높이기 위한 중급 과정",
  },
  {
    id: "portfolio-3",
    label: "포트폴리오 3",
    description: "최종 검수와 디테일 업 작업",
  },
];

export function getGallerySectionId(tabId: string) {
  return `gallery-${tabId}`;
}
