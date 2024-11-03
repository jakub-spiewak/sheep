import { api } from "../api";
export const addTagTypes = ["expense-blueprint"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getExpenseEntries: build.query<
        GetExpenseEntriesApiResponse,
        GetExpenseEntriesApiArg
      >({
        query: () => ({ url: `/expense-entry` }),
      }),
      createExpenseEntry: build.mutation<
        CreateExpenseEntryApiResponse,
        CreateExpenseEntryApiArg
      >({
        query: (queryArg) => ({
          url: `/expense-entry`,
          method: "POST",
          body: queryArg.expenseEntryCreateRequest,
        }),
      }),
      getExpenseEntryById: build.query<
        GetExpenseEntryByIdApiResponse,
        GetExpenseEntryByIdApiArg
      >({
        query: (queryArg) => ({ url: `/expense-entry/${queryArg.entryId}` }),
      }),
      updateExpenseEntry: build.mutation<
        UpdateExpenseEntryApiResponse,
        UpdateExpenseEntryApiArg
      >({
        query: (queryArg) => ({
          url: `/expense-entry/${queryArg.entryId}`,
          method: "PUT",
          body: queryArg.expenseEntryUpdateRequest,
        }),
      }),
      deleteExpenseEntry: build.mutation<
        DeleteExpenseEntryApiResponse,
        DeleteExpenseEntryApiArg
      >({
        query: (queryArg) => ({
          url: `/expense-entry/${queryArg.entryId}`,
          method: "DELETE",
        }),
      }),
      getExpenseBlueprints: build.query<
        GetExpenseBlueprintsApiResponse,
        GetExpenseBlueprintsApiArg
      >({
        query: () => ({ url: `/expense-blueprint` }),
        providesTags: ["expense-blueprint"],
      }),
      createExpenseBlueprint: build.mutation<
        CreateExpenseBlueprintApiResponse,
        CreateExpenseBlueprintApiArg
      >({
        query: (queryArg) => ({
          url: `/expense-blueprint`,
          method: "POST",
          body: queryArg.expenseBlueprintCreateRequest,
        }),
        invalidatesTags: ["expense-blueprint"],
      }),
      getExpenseBlueprintById: build.query<
        GetExpenseBlueprintByIdApiResponse,
        GetExpenseBlueprintByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/expense-blueprint/${queryArg.blueprintId}`,
        }),
        providesTags: ["expense-blueprint"],
      }),
      updateExpenseBlueprint: build.mutation<
        UpdateExpenseBlueprintApiResponse,
        UpdateExpenseBlueprintApiArg
      >({
        query: (queryArg) => ({
          url: `/expense-blueprint/${queryArg.blueprintId}`,
          method: "PUT",
          body: queryArg.expenseBlueprintUpdateRequest,
        }),
        invalidatesTags: ["expense-blueprint"],
      }),
      deleteExpenseBlueprint: build.mutation<
        DeleteExpenseBlueprintApiResponse,
        DeleteExpenseBlueprintApiArg
      >({
        query: (queryArg) => ({
          url: `/expense-blueprint/${queryArg.blueprintId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["expense-blueprint"],
      }),
      getIncomeEntries: build.query<
        GetIncomeEntriesApiResponse,
        GetIncomeEntriesApiArg
      >({
        query: () => ({ url: `/income-entry` }),
      }),
      createIncomeEntry: build.mutation<
        CreateIncomeEntryApiResponse,
        CreateIncomeEntryApiArg
      >({
        query: (queryArg) => ({
          url: `/income-entry`,
          method: "POST",
          body: queryArg.incomeEntryCreateRequest,
        }),
      }),
      getIncomeEntryById: build.query<
        GetIncomeEntryByIdApiResponse,
        GetIncomeEntryByIdApiArg
      >({
        query: (queryArg) => ({ url: `/income-entry/${queryArg.entryId}` }),
      }),
      updateIncomeEntry: build.mutation<
        UpdateIncomeEntryApiResponse,
        UpdateIncomeEntryApiArg
      >({
        query: (queryArg) => ({
          url: `/income-entry/${queryArg.entryId}`,
          method: "PUT",
          body: queryArg.incomeEntryUpdateRequest,
        }),
      }),
      deleteIncomeEntry: build.mutation<
        DeleteIncomeEntryApiResponse,
        DeleteIncomeEntryApiArg
      >({
        query: (queryArg) => ({
          url: `/income-entry/${queryArg.entryId}`,
          method: "DELETE",
        }),
      }),
      getIncomeBlueprints: build.query<
        GetIncomeBlueprintsApiResponse,
        GetIncomeBlueprintsApiArg
      >({
        query: () => ({ url: `/income-blueprint` }),
      }),
      createIncomeBlueprint: build.mutation<
        CreateIncomeBlueprintApiResponse,
        CreateIncomeBlueprintApiArg
      >({
        query: (queryArg) => ({
          url: `/income-blueprint`,
          method: "POST",
          body: queryArg.incomeBlueprintCreateRequest,
        }),
      }),
      getIncomeBlueprintById: build.query<
        GetIncomeBlueprintByIdApiResponse,
        GetIncomeBlueprintByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/income-blueprint/${queryArg.blueprintId}`,
        }),
      }),
      updateIncomeBlueprint: build.mutation<
        UpdateIncomeBlueprintApiResponse,
        UpdateIncomeBlueprintApiArg
      >({
        query: (queryArg) => ({
          url: `/income-blueprint/${queryArg.blueprintId}`,
          method: "PUT",
          body: queryArg.incomeBlueprintUpdateRequest,
        }),
      }),
      deleteIncomeBlueprint: build.mutation<
        DeleteIncomeBlueprintApiResponse,
        DeleteIncomeBlueprintApiArg
      >({
        query: (queryArg) => ({
          url: `/income-blueprint/${queryArg.blueprintId}`,
          method: "DELETE",
        }),
      }),
      getTags: build.query<GetTagsApiResponse, GetTagsApiArg>({
        query: () => ({ url: `/tag` }),
      }),
      createTag: build.mutation<CreateTagApiResponse, CreateTagApiArg>({
        query: (queryArg) => ({
          url: `/tag`,
          method: "POST",
          body: queryArg.tagCreateRequest,
        }),
      }),
      getTagById: build.query<GetTagByIdApiResponse, GetTagByIdApiArg>({
        query: (queryArg) => ({ url: `/tag/${queryArg.tagId}` }),
      }),
      updateTag: build.mutation<UpdateTagApiResponse, UpdateTagApiArg>({
        query: (queryArg) => ({
          url: `/tag/${queryArg.tagId}`,
          method: "PUT",
          body: queryArg.tagUpdateRequest,
        }),
      }),
      deleteTag: build.mutation<DeleteTagApiResponse, DeleteTagApiArg>({
        query: (queryArg) => ({
          url: `/tag/${queryArg.tagId}`,
          method: "DELETE",
        }),
      }),
      getFinancialSummary: build.query<
        GetFinancialSummaryApiResponse,
        GetFinancialSummaryApiArg
      >({
        query: (queryArg) => ({
          url: `/report/summary`,
          params: {
            startDate: queryArg.startDate,
            endDate: queryArg.endDate,
          },
        }),
      }),
      getExpensesByTag: build.query<
        GetExpensesByTagApiResponse,
        GetExpensesByTagApiArg
      >({
        query: (queryArg) => ({
          url: `/report/expenses-by-tag`,
          params: {
            startDate: queryArg.startDate,
            endDate: queryArg.endDate,
          },
        }),
      }),
      getIncomeBySource: build.query<
        GetIncomeBySourceApiResponse,
        GetIncomeBySourceApiArg
      >({
        query: (queryArg) => ({
          url: `/report/income-by-source`,
          params: {
            startDate: queryArg.startDate,
            endDate: queryArg.endDate,
          },
        }),
      }),
      getCashFlow: build.query<GetCashFlowApiResponse, GetCashFlowApiArg>({
        query: (queryArg) => ({
          url: `/report/cash-flow`,
          params: {
            startDate: queryArg.startDate,
            endDate: queryArg.endDate,
            interval: queryArg.interval,
          },
        }),
      }),
      getFinancialProjections: build.query<
        GetFinancialProjectionsApiResponse,
        GetFinancialProjectionsApiArg
      >({
        query: (queryArg) => ({
          url: `/report/projections`,
          params: {
            futurePeriod: queryArg.futurePeriod,
          },
        }),
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enhancedApi };
export type GetExpenseEntriesApiResponse =
  /** status 200 A list of expense entries retrieved successfully. */ ExpenseEntryResponse[];
export type GetExpenseEntriesApiArg = void;
export type CreateExpenseEntryApiResponse =
  /** status 201 Expense entry created successfully. */ ExpenseEntryResponse;
export type CreateExpenseEntryApiArg = {
  /** Expense entry details to be created. */
  expenseEntryCreateRequest: ExpenseEntryCreateRequest;
};
export type GetExpenseEntryByIdApiResponse =
  /** status 200 Expense entry details retrieved successfully. */ ExpenseEntryResponse;
export type GetExpenseEntryByIdApiArg = {
  /** The unique identifier of the entry. */
  entryId: string;
};
export type UpdateExpenseEntryApiResponse =
  /** status 200 Expense entry updated successfully. */ ExpenseEntryResponse;
export type UpdateExpenseEntryApiArg = {
  /** The unique identifier of the entry. */
  entryId: string;
  /** Updated expense entry details. */
  expenseEntryUpdateRequest: ExpenseEntryUpdateRequest;
};
export type DeleteExpenseEntryApiResponse = unknown;
export type DeleteExpenseEntryApiArg = {
  /** The unique identifier of the entry. */
  entryId: string;
};
export type GetExpenseBlueprintsApiResponse =
  /** status 200 A list of expense blueprints retrieved successfully. */ ExpenseBlueprintResponse[];
export type GetExpenseBlueprintsApiArg = void;
export type CreateExpenseBlueprintApiResponse =
  /** status 201 Expense blueprint created successfully. */ ExpenseBlueprintResponse;
export type CreateExpenseBlueprintApiArg = {
  /** Expense blueprint details to be created. */
  expenseBlueprintCreateRequest: ExpenseBlueprintCreateRequest;
};
export type GetExpenseBlueprintByIdApiResponse =
  /** status 200 Expense blueprint details retrieved successfully. */ ExpenseBlueprintResponse;
export type GetExpenseBlueprintByIdApiArg = {
  /** The unique identifier of the blueprint. */
  blueprintId: string;
};
export type UpdateExpenseBlueprintApiResponse =
  /** status 200 Expense blueprint updated successfully. */ ExpenseBlueprintResponse;
export type UpdateExpenseBlueprintApiArg = {
  /** The unique identifier of the blueprint. */
  blueprintId: string;
  /** Updated expense blueprint details. */
  expenseBlueprintUpdateRequest: ExpenseBlueprintUpdateRequest;
};
export type DeleteExpenseBlueprintApiResponse = unknown;
export type DeleteExpenseBlueprintApiArg = {
  /** The unique identifier of the blueprint. */
  blueprintId: string;
};
export type GetIncomeEntriesApiResponse =
  /** status 200 A list of income entries retrieved successfully. */ IncomeEntryResponse[];
export type GetIncomeEntriesApiArg = void;
export type CreateIncomeEntryApiResponse =
  /** status 201 Income entry created successfully. */ IncomeEntryResponse;
export type CreateIncomeEntryApiArg = {
  /** Income entry details to be created. */
  incomeEntryCreateRequest: IncomeEntryCreateRequest;
};
export type GetIncomeEntryByIdApiResponse =
  /** status 200 Income entry details retrieved successfully. */ IncomeEntryResponse;
export type GetIncomeEntryByIdApiArg = {
  /** The unique identifier of the entry. */
  entryId: string;
};
export type UpdateIncomeEntryApiResponse =
  /** status 200 Income entry updated successfully. */ IncomeEntryResponse;
export type UpdateIncomeEntryApiArg = {
  /** The unique identifier of the entry. */
  entryId: string;
  /** Updated income entry details. */
  incomeEntryUpdateRequest: IncomeEntryUpdateRequest;
};
export type DeleteIncomeEntryApiResponse = unknown;
export type DeleteIncomeEntryApiArg = {
  /** The unique identifier of the entry. */
  entryId: string;
};
export type GetIncomeBlueprintsApiResponse =
  /** status 200 A list of income blueprints retrieved successfully. */ IncomeBlueprintResponse[];
export type GetIncomeBlueprintsApiArg = void;
export type CreateIncomeBlueprintApiResponse =
  /** status 201 Income blueprint created successfully. */ IncomeBlueprintResponse;
export type CreateIncomeBlueprintApiArg = {
  /** Income blueprint details to be created. */
  incomeBlueprintCreateRequest: IncomeBlueprintCreateRequest;
};
export type GetIncomeBlueprintByIdApiResponse =
  /** status 200 Income blueprint details retrieved successfully. */ IncomeBlueprintResponse;
export type GetIncomeBlueprintByIdApiArg = {
  /** The unique identifier of the blueprint. */
  blueprintId: string;
};
export type UpdateIncomeBlueprintApiResponse =
  /** status 200 Income blueprint updated successfully. */ IncomeBlueprintResponse;
export type UpdateIncomeBlueprintApiArg = {
  /** The unique identifier of the blueprint. */
  blueprintId: string;
  /** Updated income blueprint details. */
  incomeBlueprintUpdateRequest: IncomeBlueprintUpdateRequest;
};
export type DeleteIncomeBlueprintApiResponse = unknown;
export type DeleteIncomeBlueprintApiArg = {
  /** The unique identifier of the blueprint. */
  blueprintId: string;
};
export type GetTagsApiResponse =
  /** status 200 A list of tags retrieved successfully. */ TagResponse[];
export type GetTagsApiArg = void;
export type CreateTagApiResponse =
  /** status 201 Tag created successfully. */ TagResponse;
export type CreateTagApiArg = {
  /** Tag details to be created. */
  tagCreateRequest: TagCreateRequest;
};
export type GetTagByIdApiResponse =
  /** status 200 Tag details retrieved successfully. */ TagResponse;
export type GetTagByIdApiArg = {
  /** The unique identifier of the tag. */
  tagId: string;
};
export type UpdateTagApiResponse =
  /** status 200 Tag updated successfully. */ TagResponse;
export type UpdateTagApiArg = {
  /** The unique identifier of the tag. */
  tagId: string;
  /** Updated tag details. */
  tagUpdateRequest: TagUpdateRequest;
};
export type DeleteTagApiResponse = unknown;
export type DeleteTagApiArg = {
  /** The unique identifier of the tag. */
  tagId: string;
};
export type GetFinancialSummaryApiResponse =
  /** status 200 Financial summary retrieved successfully. */ FinancialSummaryResponse;
export type GetFinancialSummaryApiArg = {
  /** Start date in YYYY-MM-DD format for filtering reports. */
  startDate: string;
  /** End date in YYYY-MM-DD format for filtering reports. */
  endDate: string;
};
export type GetExpensesByTagApiResponse =
  /** status 200 Expenses grouped by tag retrieved successfully. */ ExpensesByTagResponse[];
export type GetExpensesByTagApiArg = {
  /** Start date in YYYY-MM-DD format for filtering reports. */
  startDate: string;
  /** End date in YYYY-MM-DD format for filtering reports. */
  endDate: string;
};
export type GetIncomeBySourceApiResponse =
  /** status 200 Income grouped by source retrieved successfully. */ IncomeBySourceResponse[];
export type GetIncomeBySourceApiArg = {
  /** Start date in YYYY-MM-DD format for filtering reports. */
  startDate: string;
  /** End date in YYYY-MM-DD format for filtering reports. */
  endDate: string;
};
export type GetCashFlowApiResponse =
  /** status 200 Cash flow data retrieved successfully. */ CashFlowResponse;
export type GetCashFlowApiArg = {
  /** Start date in YYYY-MM-DD format for filtering reports. */
  startDate: string;
  /** End date in YYYY-MM-DD format for filtering reports. */
  endDate: string;
  /** Time interval for cash flow data (DAILY, WEEKLY, MONTHLY). */
  interval?: IntervalEnum;
};
export type GetFinancialProjectionsApiResponse =
  /** status 200 Financial projections retrieved successfully. */ FinancialProjectionsResponse;
export type GetFinancialProjectionsApiArg = {
  /** Number of days to project into the future for financial projections. */
  futurePeriod: number;
};
export type ExpenseEntryResponse = {
  /** Unique identifier of the expense entry. */
  id: string;
  /** The amount of the expense. */
  amount: number;
  /** The date when the expense was incurred. */
  date: string;
  /** A brief description of the expense. */
  description?: string;
  /** The ID of the associated expense blueprint, if any. */
  blueprintId?: string | null;
  /** A list of tag IDs associated with the expense. */
  tags?: string[];
};
export type ExpenseEntryCreateRequest = {
  /** The amount of the expense. */
  amount: number;
  /** The date when the expense was incurred. */
  date: string;
  /** A brief description of the expense. */
  description?: string;
  /** The ID of the associated expense blueprint, if any. */
  blueprintId?: string | null;
  /** A list of tag IDs to categorize the expense. */
  tags?: string[];
};
export type ExpenseEntryUpdateRequest = {
  /** The updated amount of the expense. */
  amount?: number;
  /** The updated date when the expense was incurred. */
  date?: string;
  /** The updated description of the expense. */
  description?: string;
  /** The updated ID of the associated expense blueprint, if any. */
  blueprintId?: string | null;
  /** The updated list of tag IDs associated with the expense. */
  tags?: string[];
};
export type EstimatedAmountTypeEnum =
  | "FIXED"
  | "RANGE"
  | "VARIANCE_AMOUNT"
  | "VARIANCE_PERCENT";
export type EstimatedAmountBase = {
  type: EstimatedAmountTypeEnum;
};
export type FixedAmount = {
  type: "FIXED";
} & EstimatedAmountBase & {
    /** The fixed amount value. */
    amount: number;
  };
export type RangeAmount = {
  type: "RANGE";
} & EstimatedAmountBase & {
    /** The minimum estimated amount. */
    min: number;
    /** The maximum estimated amount. */
    max: number;
  };
export type VarianceAmount = {
  type: "VARIANCE_AMOUNT";
} & EstimatedAmountBase & {
    /** The base amount. */
    amount: number;
    /** The variance to apply to the base amount. */
    variance: number;
  };
export type VariancePercent = {
  type: "VARIANCE_PERCENT";
} & EstimatedAmountBase & {
    /** The base amount. */
    amount: number;
    /** The variance percentage to apply to the base amount. */
    variancePercent: number;
  };
export type EstimatedAmount =
  | FixedAmount
  | RangeAmount
  | VarianceAmount
  | VariancePercent;
export type FrequencyEnum = "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
export type ExpenseBlueprintResponse = {
  /** Unique identifier of the expense blueprint. */
  id: string;
  /** The name of the expense blueprint. */
  name: string;
  estimatedAmount: EstimatedAmount;
  frequency: FrequencyEnum;
  /** The start date for the expense blueprint. */
  startDate: string;
  /** The optional end date for the expense blueprint. */
  endDate?: string | null;
  /** A list of tag IDs associated with the blueprint. */
  tags?: string[];
};
export type ExpenseBlueprintCreateRequest = {
  /** The name of the expense blueprint. */
  name: string;
  estimatedAmount: EstimatedAmount;
  frequency: FrequencyEnum;
  /** The start date for the expense blueprint. */
  startDate: string;
  /** The optional end date for the expense blueprint. */
  endDate?: string | null;
  /** A list of tag IDs to associate with the blueprint. */
  tags?: string[];
};
export type ExpenseBlueprintUpdateRequest = {
  /** The updated name of the expense blueprint. */
  name?: string;
  estimatedAmount?: EstimatedAmount;
  frequency?: FrequencyEnum;
  /** The updated start date for the expense blueprint. */
  startDate?: string;
  /** The updated optional end date for the expense blueprint. */
  endDate?: string | null;
  /** The updated list of tag IDs associated with the blueprint. */
  tags?: string[];
};
export type IncomeEntryResponse = {
  /** Unique identifier of the income entry. */
  id: string;
  /** The amount of the income. */
  amount: number;
  /** The date when the income was received. */
  date: string;
  /** A brief description of the income. */
  description?: string;
  /** The ID of the associated income blueprint, if any. */
  blueprintId?: string | null;
};
export type IncomeEntryCreateRequest = {
  /** The amount of the income. */
  amount: number;
  /** The date when the income was received. */
  date: string;
  /** A brief description of the income. */
  description?: string;
  /** The ID of the associated income blueprint, if any. */
  blueprintId?: string | null;
};
export type IncomeEntryUpdateRequest = {
  /** The updated amount of the income. */
  amount?: number;
  /** The updated date when the income was received. */
  date?: string;
  /** The updated description of the income. */
  description?: string;
  /** The updated ID of the associated income blueprint, if any. */
  blueprintId?: string | null;
};
export type IncomeBlueprintResponse = {
  /** Unique identifier of the income blueprint. */
  id: string;
  /** The name of the income blueprint. */
  name: string;
  estimatedAmount: EstimatedAmount;
  frequency: FrequencyEnum;
  /** The start date for the income blueprint. */
  startDate: string;
  /** The optional end date for the income blueprint. */
  endDate?: string | null;
};
export type IncomeBlueprintCreateRequest = {
  /** The name of the income blueprint. */
  name: string;
  estimatedAmount: EstimatedAmount;
  frequency: FrequencyEnum;
  /** The start date for the income blueprint. */
  startDate: string;
  /** The optional end date for the income blueprint. */
  endDate?: string | null;
};
export type IncomeBlueprintUpdateRequest = {
  /** The updated name of the income blueprint. */
  name: string;
  estimatedAmount: EstimatedAmount;
  frequency: FrequencyEnum;
  /** The updated start date for the income blueprint. */
  startDate: string;
  /** The updated optional end date for the income blueprint. */
  endDate?: string | null;
};
export type TagResponse = {
  /** Unique identifier of the tag. */
  id: string;
  /** The name of the tag. */
  name: string;
};
export type TagCreateRequest = {
  /** The name of the tag. */
  name: string;
};
export type TagUpdateRequest = {
  /** The updated name of the tag. */
  name: string;
};
export type FinancialSummaryResponse = {
  /** The total income during the specified period. */
  totalIncome: number;
  /** The total expenses during the specified period. */
  totalExpenses: number;
  /** The net balance calculated as total income minus total expenses. */
  netBalance: number;
};
export type ExpensesByTagResponse = {
  /** The unique identifier of the tag. */
  tagId: string;
  /** The name of the tag. */
  tagName: string;
  /** The total amount of expenses associated with the tag. */
  totalAmount: number;
};
export type IncomeBySourceResponse = {
  /** The unique identifier of the income source. */
  sourceId: string;
  /** The name of the income source. */
  sourceName: string;
  /** The total amount of income associated with the source. */
  totalAmount: number;
};
export type CashFlowResponse = {
  /** A list of cash flow data points. */
  dataPoints: {
    /** The date of the cash flow data point. */
    date: string;
    /** The net balance on the specified date. */
    netBalance: number;
  }[];
};
export type IntervalEnum = "DAILY" | "WEEKLY" | "MONTHLY";
export type FinancialProjectionsResponse = {
  /** The projected total income for the future period. */
  projectedIncome: number;
  /** The projected total expenses for the future period. */
  projectedExpenses: number;
  /** The projected net balance calculated as projected income minus projected expenses. */
  projectedNetBalance: number;
  /** Detailed projections for each date in the future period. */
  details: {
    /** The date of the projection. */
    date: string;
    /** The projected income on the specified date. */
    income: number;
    /** The projected expenses on the specified date. */
    expenses: number;
    /** The projected net balance on the specified date. */
    netBalance: number;
  }[];
};
export const {
  useGetExpenseEntriesQuery,
  useCreateExpenseEntryMutation,
  useGetExpenseEntryByIdQuery,
  useUpdateExpenseEntryMutation,
  useDeleteExpenseEntryMutation,
  useGetExpenseBlueprintsQuery,
  useCreateExpenseBlueprintMutation,
  useGetExpenseBlueprintByIdQuery,
  useUpdateExpenseBlueprintMutation,
  useDeleteExpenseBlueprintMutation,
  useGetIncomeEntriesQuery,
  useCreateIncomeEntryMutation,
  useGetIncomeEntryByIdQuery,
  useUpdateIncomeEntryMutation,
  useDeleteIncomeEntryMutation,
  useGetIncomeBlueprintsQuery,
  useCreateIncomeBlueprintMutation,
  useGetIncomeBlueprintByIdQuery,
  useUpdateIncomeBlueprintMutation,
  useDeleteIncomeBlueprintMutation,
  useGetTagsQuery,
  useCreateTagMutation,
  useGetTagByIdQuery,
  useUpdateTagMutation,
  useDeleteTagMutation,
  useGetFinancialSummaryQuery,
  useGetExpensesByTagQuery,
  useGetIncomeBySourceQuery,
  useGetCashFlowQuery,
  useGetFinancialProjectionsQuery,
} = injectedRtkApi;
