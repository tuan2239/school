export interface Query {
    children: any;
}

export interface Mutation{
    token?: String;
}

export interface MutationResponse {
    data?: Mutation;
}