import {useState,useCallback,useRef} from 'react'
import { Select,Spin } from 'antd'
import debounce from 'lodash/debounce'
import api from '../lib/api'

const Option = Select.Option
function SearchUser({onChange,value}){
    const [fetching,setFetching] = useState(false)
    const [options,setOptions] = useState([])
    //useRef返回：{ currnet:0}
    const lastFatchIdRef = useRef(0)
    const fetchUser = useCallback(debounce((value)=>{
        lastFatchIdRef.current+=1
        const fetchId = lastFatchIdRef.current
        setFetching(true)
        setOptions([])
        api.request({
            url:`/search/users?q=${value}`
        }).then(res=>{
            console.log("user:",res)
            if(fetchId!==lastFatchIdRef.current){
                return
            }
            const data = res.data.items.map(user=>({
                text:user.login,
                value:user.login
            }))
            setFetching(false)
            setOptions(data)
        })
    },500),[])
    const handleChange = (value)=>{
        setOptions([])
        setFetching(false)
        onChange  (value)
    }
    return (
        <Select
        style={{ width:200}}
        showSearch={true}
        notFoundContent = {fetching ? <Spin size='small'/>: <span>Nothing found</span>}
        filterOption = {false}
        placeholder = "creator"
        allowClear = {true}
        onSearch={fetchUser}
        onChange = {handleChange}
        value={value}
        >
            {
                options.map(op=>(
                <Option value={op.value} key = {op.value}>{op.text}</Option>
                ))
            }

        </Select>
    )
}
export default SearchUser