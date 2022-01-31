export interface Challenge {
    id?: number | string;
    created_at?: string;
    title: string;
    description: string;
    start_date: Date;
    end_date: Date;
    author: number | string;
    supervisors: any;
    challenger: number | string;
    status: 'pending' | 'rejected' | 'accepted';
    is_completed: boolean;
    validators: any;
}