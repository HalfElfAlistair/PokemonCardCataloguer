// Cards types

export type Card = {
    id: string;
    name: string;
    category: string;
    count: number;
    image: string;
    types?: string[];
    stage?: string;
    [key: string]: unknown; // accounts for currently unused fields
};
export type Cards = Record<string, Card>;


// lists types

export type List = string[];
export type Lists = Record<string, List>;

// sets types

export type Set = any;
export type Sets = Record<string, Set>;

// data type
export type Data = {
    cards: Cards;
    lists: Record<string, any>;
    decks: Record<string, any>;
    sets: Record<string, any>;
};

// netlify function request response types

type SuccessfulRequest = {
    status: number;
    data: Cards;
};

type FailedRequest = {
    status: number;
    message: string;
};

export type RequestResponse = SuccessfulRequest | FailedRequest;