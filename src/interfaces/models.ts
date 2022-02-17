type ID = number | string;
type Minutes = number;
type DateTime = string;

export interface ChallengeDraft {
  id?: ID;
  title: string;
  description: string;
  duration: Minutes; 
  author: ID;
  supervisors: Array<ID>;
  challenger: ID;
  status: 'drafted' | 'in_proposal';
}

export interface ChallengeProposal {
  id?: ID;
  title: string;
  description: string;
  duration: Minutes; 
  author: ID;
  supervisors: Array<ID>;
  challenger: ID;
  status: 'rejected' | 'pending' | 'accepted';
}

export interface SupervisorInvitation{
  id?: ID;
  challengeProposal: ID;
  to: ID;
  status: 'rejected' | 'pending' | 'accepted';
}

export interface ChallengerInvitation{
  id?: ID;
  challengeProposal: ID;
  to: ID;
  status: 'rejected' | 'pending' | 'accepted';
}

export interface ChallengeInstance {
  id?: ID;
  title: string;
  description: string;
  start_time: DateTime;
  end_time: DateTime;
  author: ID;
  supervisors: Array<ID>;
  challenger: ID;
  status: 'abandoned' | 'on_going' | 'timeout';
}

export interface ChallengeResult{
  id?: ID;
  title: string;
  description: string;
  start_time: DateTime;
  end_time: DateTime;
  author: ID;
  supervisors: Array<ID>;
  challenger: ID;
  score: number;
  status: 'failure' | 'validating' | 'success';
}

export interface ValidationRequest {
  id?: ID;
  challengeInstance: ID;
  to: ID;
  status: 'failure' | 'pending' | 'success'
}

export interface Challenge {
    id?: ID;
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


export interface ChallengeRequest {
    id?: ID;
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
