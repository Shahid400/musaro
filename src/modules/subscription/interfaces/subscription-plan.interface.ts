export interface ISubscriptionPlan {
  plan: string;
  amount: number;
  discount?: number;
  features: string[];
}

export interface IListSubscriptionPlan {
  isActive?: boolean;
}

export interface IGetSubscriptionPlan extends IListSubscriptionPlan {
  _id: string;
}

export interface IUpdateSubscriptionPlan {
  planId: string;
  amount?: number;
  discount?: number;
  features?: string[];
  isActive?: boolean;
}
