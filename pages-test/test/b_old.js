import React, { 
                useState, 
                useEffect ,
                useReducer,
                useLayoutEffect,
                useContext,
                useRef
               } from "react";

// class b extends React.Component {
//   state = {
//     counter: 0,
//   };
//   componentDidMount() {
//     this.interval = setInterval(() => {
//       this.setState({ counter: this.state.counter + 1 });
//     }, 1000);
//   }
//   componentWillUnmount() {
//     if (this.interval) {
//       clearInterval(this.interval);
//     }
//   }
//   render() {
//     return (
//       <div>
//         倒数：
//         <span>{this.state.counter}</span>
//       </div>
//     );
//   }
// }
function countReducer(state,action){
    switch(action.type){
        case 'add':
            return state + 1
        case 'minus':
            return state - 1
        default:
            return state
    }
}


function MyCountFunc() {
//   const [counter, setcounter] = useState(0);
    let [count,dispatchCount] = useReducer(countReducer,0)
    const [name,setName] = useState('jack')

    const inputRef = useRef()
  // 渲染完之后的回调函数
//   useEffect(() => {
//     const interval = setInterval(() => {
//     //   setcounter((c)=>{ 
//     //       return c+1
//     //   });
//     dispatchCount({type:'minus'})
//     }, 1000)
    
//     //组件在卸载的时候执行 return 清楚interval
//     return()=>clearTimeout(interval)
//   },[]);
    useEffect(()=>{
        count+=1
        console.log('effect invoked')
        console.log(inputRef)
        return ()=> console.log('effect detected')
        
    },[count,name])
    useLayoutEffect(()=>{
        count+=1
        console.log('layout_effect')
        return ()=> console.log('layout_effect detected')
    },[count,name])
  return (
    <div>
      倒数：
      <button  onClick={()=>dispatchCount({type:'add'}) }>{count}</button>
      <input ref={inputRef} value = {name} onChange = {e=>setName(e.target.value)}></input>
      
    </div>
  );
}

export default MyCountFunc;
