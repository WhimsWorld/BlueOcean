import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { increment, incrementByAmount} from "./features/counter/countSlice";

function Counter() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>

    </div>
  );
}
export default Counter;