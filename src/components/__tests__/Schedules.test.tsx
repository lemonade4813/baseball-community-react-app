import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSchedulesQuery } from "@/hooks/queries/useScheduleQuery";
import Schedule from "../pages/Schedules";
import { vi } from "vitest";

vi.mock("@/hooks/queries/useScheduleQuery");

const mockUseSchedulesQuery = useSchedulesQuery as jest.MockedFunction<typeof useSchedulesQuery>;

const queryClient = new QueryClient();

describe("Schedules 컴포넌트", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("렌더링 중에는 로딩 메시지가 올바르게 표시되는지 확인합니다.", () => {
    mockUseSchedulesQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as any);

    render(
      <QueryClientProvider client={queryClient}>
        <Schedule />
      </QueryClientProvider>
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("데이터가 올바르게 로딩되었는지 확인합니다.", async () => {
    const mockSchedules = [
      {
        month: "5",
        date: "10",
        day: "목",
        time: "18:30",
        awayTeam: "두산",
        homeTeam: "LG",
        notes: "-",
      },
      {
        month: "4",
        date : "11",
        day: "금",
        time: "18:30",
        awayTeam: "KIA",
        homeTeam: "삼성",
        notes: "-",
      },
    ];

    mockUseSchedulesQuery.mockReturnValue({
      data: mockSchedules,
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    render(
      <QueryClientProvider client={queryClient}>
        <Schedule />
      </QueryClientProvider>
    );

    await waitFor(() => {

      expect(screen.getByRole('cell', {name : '5.10'})).toBeInTheDocument();
      expect(screen.getByRole('cell', {name : '목'})).toBeInTheDocument();
      expect(screen.queryAllByRole('cell', { name: '18:30' }).length).toBeGreaterThan(0);
      expect(screen.getByRole('cell', {name : '두산'})).toBeInTheDocument();
      expect(screen.getByRole('cell', {name : 'LG'})).toBeInTheDocument();

      expect(screen.getByRole('cell', {name : '4.11'})).toBeInTheDocument();
      expect(screen.getByRole('cell', {name : '금'})).toBeInTheDocument();
      expect(screen.getByRole('cell', {name : 'KIA'})).toBeInTheDocument();
      expect(screen.getByRole('cell', {name : '삼성'})).toBeInTheDocument();
    });
  });

  it("팀을 변경할 경우 조건에 따라 데이터가 올바르게 필터링 되는지 확인합니다. ", async () => {
    const mockSchedules = [
      {
        month: "5",
        date: "10",
        day: "목",
        time: "18:30",
        awayTeam: "두산",
        homeTeam: "LG",
        notes: "-",
      },
      {
        month: "4",
        date: "11",
        day: "금",
        time: "18:30",
        awayTeam: "KIA",
        homeTeam: "삼성",
        notes: "-",
      },
    ];

    mockUseSchedulesQuery.mockReturnValue({
      data: mockSchedules,
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    render(
      <QueryClientProvider client={queryClient}>
        <Schedule />
      </QueryClientProvider>
    );

    
    const teamElement = screen.getAllByText("전체");

    expect(teamElement).toHaveLength(2);

    const teamItemElement = screen.getByRole('button', {name : '두산 베어스'});

    expect(teamItemElement).toBeInTheDocument();

    fireEvent.click(teamItemElement);

    await waitFor(() => {

      expect(screen.getByRole('cell', {name : '5.10'})).toBeInTheDocument();
      expect(screen.getByRole('cell', {name : '목'})).toBeInTheDocument();
      expect(screen.getByRole('cell', {name : '두산'})).toBeInTheDocument();
      expect(screen.getByRole('cell', {name: '18:30' })).toBeInTheDocument();
      expect(screen.getByRole('cell', {name : 'LG'})).toBeInTheDocument();
  
      expect(screen.queryByRole('cell', {name : '4.11'})).not.toBeInTheDocument();
      expect(screen.queryByRole('cell', {name : '금'})).not.toBeInTheDocument();
      expect(screen.queryByRole('cell', {name : 'KIA'})).not.toBeInTheDocument();
      expect(screen.queryByRole('cell', {name : '삼성'})).not.toBeInTheDocument();
    });
  });

  it("캘린더에서 월을 변경할 조건에 따라 데이터가 올바르게 필터링 되는지 확인합니다. ", async () => {
    const mockSchedules = [
      {
        month: "5",
        date: "10",
        day: "목",
        time: "18:30",
        awayTeam: "두산",
        homeTeam: "LG",
        notes: "-",
      },
      {
        month: "4",
        date: "11",
        day: "금",
        time: "18:30",
        awayTeam: "KIA",
        homeTeam: "삼성",
        notes: "-",
      },
    ];

    mockUseSchedulesQuery.mockReturnValue({
      data: mockSchedules,
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    render(
      <QueryClientProvider client={queryClient}>
        <Schedule />
      </QueryClientProvider>
    );

    
    const monthPlaceholderElement = screen.getByPlaceholderText("월을 선택해주세요");

    expect(monthPlaceholderElement).toBeInTheDocument();

    fireEvent.click(monthPlaceholderElement);

    const monthItem = screen.getByText("5월");

    expect(monthItem).toBeInTheDocument();

    fireEvent.click(monthItem);

    await waitFor(() => {

      expect(screen.getByRole('cell', {name : '5.10'})).toBeInTheDocument();
      expect(screen.getByRole('cell', {name : '목'})).toBeInTheDocument();
      expect(screen.getByRole('cell', {name : '두산'})).toBeInTheDocument();
      expect(screen.getByRole('cell', {name: '18:30' })).toBeInTheDocument();
      expect(screen.getByRole('cell', {name : 'LG'})).toBeInTheDocument();
  
      expect(screen.queryByRole('cell', {name : '4.11'})).not.toBeInTheDocument();
      expect(screen.queryByRole('cell', {name : '금'})).not.toBeInTheDocument();
      expect(screen.queryByRole('cell', {name : 'KIA'})).not.toBeInTheDocument();
      expect(screen.queryByRole('cell', {name : '삼성'})).not.toBeInTheDocument();
    });
  });
});