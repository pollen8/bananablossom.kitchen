export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  /** The `Long` scalar type represents non-fractional signed whole numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: any;
  Time: any;
};

export type Event = {
  __typename?: 'Event';
  /** The document's ID. */
  _id: Scalars['ID'];
  /** The document's timestamp. */
  _ts: Scalars['Long'];
  date: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  places?: Maybe<Scalars['Int']>;
  placesSold?: Maybe<Scalars['Int']>;
  published: Scalars['Boolean'];
  saleEndData?: Maybe<Scalars['Date']>;
  tickets: TicketPage;
  time: Scalars['String'];
  url?: Maybe<Scalars['String']>;
};


export type EventTicketsArgs = {
  _cursor?: InputMaybe<Scalars['String']>;
  _size?: InputMaybe<Scalars['Int']>;
};

/** 'Event' input values */
export type EventInput = {
  date: Scalars['Date'];
  description?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  places?: InputMaybe<Scalars['Int']>;
  placesSold?: InputMaybe<Scalars['Int']>;
  published: Scalars['Boolean'];
  saleEndData?: InputMaybe<Scalars['Date']>;
  tickets?: InputMaybe<EventTicketsRelation>;
  time: Scalars['String'];
  url?: InputMaybe<Scalars['String']>;
};

/** The pagination object for elements of type 'Event'. */
export type EventPage = {
  __typename?: 'EventPage';
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
  /** The elements of type 'Event' in this page. */
  data: Array<Maybe<Event>>;
};

/** Allow manipulating the relationship between the types 'Event' and 'Ticket'. */
export type EventTicketsRelation = {
  /** Connect one or more documents of type 'Ticket' with the current document using their IDs. */
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Create one or more documents of type 'Ticket' and associate them with the current document. */
  create?: InputMaybe<Array<InputMaybe<TicketInput>>>;
  /** Disconnect the given documents of type 'Ticket' from the current document using their IDs. */
  disconnect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new document in the collection of 'Event' */
  createEvent: Event;
  /** Create a new document in the collection of 'Ticket' */
  createTicket: Ticket;
  /** Delete an existing document in the collection of 'Event' */
  deleteEvent?: Maybe<Event>;
  /** Delete an existing document in the collection of 'Ticket' */
  deleteTicket?: Maybe<Ticket>;
  /** Partially updates an existing document in the collection of 'Event'. It only modifies the values that are specified in the arguments. During execution, it verifies that required fields are not set to 'null'. */
  partialUpdateEvent?: Maybe<Event>;
  /** Partially updates an existing document in the collection of 'Ticket'. It only modifies the values that are specified in the arguments. During execution, it verifies that required fields are not set to 'null'. */
  partialUpdateTicket?: Maybe<Ticket>;
  /** Update an existing document in the collection of 'Event' */
  updateEvent?: Maybe<Event>;
  /** Update an existing document in the collection of 'Ticket' */
  updateTicket?: Maybe<Ticket>;
};


export type MutationCreateEventArgs = {
  data: EventInput;
};


export type MutationCreateTicketArgs = {
  data: TicketInput;
};


export type MutationDeleteEventArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteTicketArgs = {
  id: Scalars['ID'];
};


export type MutationPartialUpdateEventArgs = {
  data: PartialUpdateEventInput;
  id: Scalars['ID'];
};


export type MutationPartialUpdateTicketArgs = {
  data: PartialUpdateTicketInput;
  id: Scalars['ID'];
};


export type MutationUpdateEventArgs = {
  data: EventInput;
  id: Scalars['ID'];
};


export type MutationUpdateTicketArgs = {
  data: TicketInput;
  id: Scalars['ID'];
};

/** 'Event' input values */
export type PartialUpdateEventInput = {
  date?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  places?: InputMaybe<Scalars['Int']>;
  placesSold?: InputMaybe<Scalars['Int']>;
  published?: InputMaybe<Scalars['Boolean']>;
  saleEndData?: InputMaybe<Scalars['Date']>;
  tickets?: InputMaybe<EventTicketsRelation>;
  time?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

/** 'Ticket' input values */
export type PartialUpdateTicketInput = {
  description?: InputMaybe<Scalars['String']>;
  event?: InputMaybe<TicketEventRelation>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
};

export type Query = {
  __typename?: 'Query';
  allEvents: EventPage;
  eventsByPublished: EventPage;
  /** Find a document from the collection of 'Event' by its id. */
  findEventByID?: Maybe<Event>;
  /** Find a document from the collection of 'Ticket' by its id. */
  findTicketByID?: Maybe<Ticket>;
};


export type QueryAllEventsArgs = {
  _cursor?: InputMaybe<Scalars['String']>;
  _size?: InputMaybe<Scalars['Int']>;
};


export type QueryEventsByPublishedArgs = {
  _cursor?: InputMaybe<Scalars['String']>;
  _size?: InputMaybe<Scalars['Int']>;
  published: Scalars['Boolean'];
};


export type QueryFindEventByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindTicketByIdArgs = {
  id: Scalars['ID'];
};

export type Ticket = {
  __typename?: 'Ticket';
  /** The document's ID. */
  _id: Scalars['ID'];
  /** The document's timestamp. */
  _ts: Scalars['Long'];
  description?: Maybe<Scalars['String']>;
  event?: Maybe<Event>;
  name: Scalars['String'];
  price?: Maybe<Scalars['Float']>;
};

/** Allow manipulating the relationship between the types 'Ticket' and 'Event' using the field 'Ticket.event'. */
export type TicketEventRelation = {
  /** Connect a document of type 'Event' with the current document using its ID. */
  connect?: InputMaybe<Scalars['ID']>;
  /** Create a document of type 'Event' and associate it with the current document. */
  create?: InputMaybe<EventInput>;
  /** If true, disconnects this document from 'Event' */
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

/** 'Ticket' input values */
export type TicketInput = {
  description?: InputMaybe<Scalars['String']>;
  event?: InputMaybe<TicketEventRelation>;
  name: Scalars['String'];
  price?: InputMaybe<Scalars['Float']>;
};

/** The pagination object for elements of type 'Ticket'. */
export type TicketPage = {
  __typename?: 'TicketPage';
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
  /** The elements of type 'Ticket' in this page. */
  data: Array<Maybe<Ticket>>;
};
