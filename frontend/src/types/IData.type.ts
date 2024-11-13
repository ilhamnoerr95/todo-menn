type DataItem = {
	completed: boolean;
	_id: string;
	name: string;
	content: string;
	__v: number;
};

export interface IDataDetail {
	status?: string;
	data?: DataItem;
}

export type IDataTodo = {
	status: Pick<IDataDetail, "status">;
	data?: DataItem[];
};
