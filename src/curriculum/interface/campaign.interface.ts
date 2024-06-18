export interface CampaignInterface {
    id:          string;
    title:       string;
    description: string;
    start_date:  Date;
    end_date:    Date;
    position:    Position;
}

export interface Position {
    id:               string;
    position:         string;
    departmentBranch: DepartmentBranch;
}

export interface DepartmentBranch {
    id:         string;
    department: Department;
    branch:     Branch;
}

export interface Branch {
    id:     string;
    branch: string;
}

export interface Department {
    id:         string;
    department: string;
}
