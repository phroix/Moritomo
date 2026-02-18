import { moritomoApi } from "../MoritomoApi";

export interface KoujouExercise {
  id: string;
  name: string;
  planned_sets: number;
  planned_reps: number;
  planned_weight: number;
  planned_rest_seconds: number;
  planned_notes: string;
  notes: string;
  created_at: string;
}

export interface KoujouWorkout {
  id: string;
  user_id: string;
  name: string;
  weekday: number;
  created_at: string;
  updated_at: string;
  koujou_exercises: KoujouExercise[] | { count: number }[];
}

export interface KoujouWorkoutSession {
  id: string;
  workout_id: string;
  user_id: string;
  performed_at: string;
}

interface GetWorkoutsParams {
  user_id: string;
  weekday?: number;
  from?: number;
  to?: number;
}

interface GetWorkoutByIdParams {
  id: string;
  user_id: string;
}

interface CreateWorkoutBody {
  user_id: string;
  name: string;
  weekday: number;
}

interface UpdateWorkoutParams {
  id: string;
  user_id: string;
  body: Partial<Pick<KoujouWorkout, "name" | "weekday">>;
}

interface DeleteWorkoutParams {
  id: string;
  user_id: string;
}

interface CopyWorkoutParams {
  id: string;
  user_id: string;
}

interface GetWorkoutSessionsParams {
  id: string;
  user_id: string;
  from?: string;
  to?: string;
}

export const api = moritomoApi.injectEndpoints({
  endpoints: (builder) => ({
    getWorkouts: builder.query<KoujouWorkout[], GetWorkoutsParams>({
      query: ({ user_id, weekday, from, to }) => {
        const params = new URLSearchParams({ user_id });
        if (weekday !== undefined) params.set("weekday", String(weekday));
        if (from !== undefined) params.set("from", String(from));
        if (to !== undefined) params.set("to", String(to));
        return {
          url: `koujou/workouts?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["KoujouPlans"],
    }),

    getWorkoutById: builder.query<KoujouWorkout, GetWorkoutByIdParams>({
      query: ({ id, user_id }) => ({
        url: `koujou/workouts/${id}?user_id=${user_id}`,
        method: "GET",
      }),
      providesTags: ["KoujouPlans"],
    }),

    createWorkout: builder.mutation<KoujouWorkout[], CreateWorkoutBody>({
      query: (body) => ({
        url: "koujou/workouts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["KoujouPlans"],
    }),

    updateWorkout: builder.mutation<KoujouWorkout[], UpdateWorkoutParams>({
      query: ({ id, user_id, body }) => ({
        url: `koujou/workouts/${id}?user_id=${user_id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["KoujouPlans"],
    }),

    deleteWorkout: builder.mutation<KoujouWorkout[], DeleteWorkoutParams>({
      query: ({ id, user_id }) => ({
        url: `koujou/workouts/${id}?user_id=${user_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["KoujouPlans"],
    }),

    copyWorkout: builder.mutation<KoujouWorkout, CopyWorkoutParams>({
      query: ({ id, user_id }) => ({
        url: `koujou/workouts/${id}/copy?user_id=${user_id}`,
        method: "POST",
      }),
      invalidatesTags: ["KoujouPlans"],
    }),

    getWorkoutSessions: builder.query<
      KoujouWorkoutSession[],
      GetWorkoutSessionsParams
    >({
      query: ({ id, user_id, from, to }) => {
        const params = new URLSearchParams({ user_id });
        if (from) params.set("from", from);
        if (to) params.set("to", to);
        return {
          url: `koujou/workouts/${id}/sessions?${params.toString()}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetWorkoutsQuery,
  useGetWorkoutByIdQuery,
  useCreateWorkoutMutation,
  useUpdateWorkoutMutation,
  useDeleteWorkoutMutation,
  useCopyWorkoutMutation,
  useGetWorkoutSessionsQuery,
} = api;
