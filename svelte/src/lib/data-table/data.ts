import type { StatusType, FeedItemStatus } from "$lib/types";

export const labels = [
	{
		value: "bug",
		label: "Bug",
		color: "red" as StatusType,
	},
	{
		value: "feature",
		label: "Feature",
		color: "blue" as StatusType,
	},
	{
		value: "documentation",
		label: "Documentation",
		color: "purple" as StatusType,
	},
	{
		value: "enhancement",
		label: "Enhancement",
		color: "teal" as StatusType,
	},
	{
		value: "refactor",
		label: "Refactor",
		color: "orange" as StatusType,
	},
];

export const statuses = [
	{
		value: "backlog",
		label: "Backlog",
		status: "queued" as FeedItemStatus,
	},
	{
		value: "todo",
		label: "Todo",
		status: "queued" as FeedItemStatus,
	},
	{
		value: "in progress",
		label: "In Progress",
		status: "run" as FeedItemStatus,
	},
	{
		value: "done",
		label: "Done",
		status: "success" as FeedItemStatus,
	},
	{
		value: "canceled",
		label: "Canceled",
		status: "failure" as FeedItemStatus,
	},
];