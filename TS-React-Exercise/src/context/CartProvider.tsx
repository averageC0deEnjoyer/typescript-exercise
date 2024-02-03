export type CartItemType = {
  sku: string;
  name: string;
  price: number;
  qty: number;
};

type CartStateType = { cart: CartItemType[] };

const initCartState: CartStateType = {
  cart: [],
};

const REDUCER_ACTION_TYPE = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  QUANTITY: 'QUANTITY',
  SUBMIT: 'SUBMIT',
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload?: CartItemType;
};

const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error('action.payload missing in ADD action');
      }
      const { sku, name, price } = action.payload;

      //check if item exist
      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      );
      //add that item to the cart
      if (!itemExists) {
        return {
          ...state,
          cart: [...state.cart, { sku, name, price, qty: 1 }],
        };
      }
      //if item already exist in the cart, we update that item Qty
      const updatedCart = state.cart.map((item) =>
        item.sku === sku ? { ...item, qty: item.qty + 1 } : item
      );
      return { ...state, cart: updatedCart };
    }
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error('action.payload missing in REMOVE action');
      }
      const { sku } = action.payload;

      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      );

      if (!itemExists) {
        throw new Error('Item is not exist');
      }

      const updatedCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );

      //return { ...state, cart: updatedCart };
      //ensure immutability
      return { ...state, cart: [...updatedCart] };
    }
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) {
        throw new Error('action.payload missing in QUANTITY action');
      }
    }
    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] };
    }
    default:
      throw new Error('Unidentified reducer action type');
  }
};

c;
