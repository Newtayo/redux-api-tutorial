import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://randomuser.me/api/?results=5'

export const getUser = createAsyncThunk('userlist/getUser', async (_,thunkAPI) => {
    try {
        
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Couldn't fetch data")
  }});

const initialState = {
  userlist: [],
  isLoading: false,
  error:undefined,
  
};

const userSlice = createSlice({
  name: 'username',
  initialState,

  reducers: {

  },
  extraReducers: (builder) => {
    builder
    .addCase(getUser.pending, (state) =>({
      ...state, isLoading: true,  
    }))
    .addCase(getUser.fulfilled, (state, action) =>{
        const data = action.payload.results;
        const newUsers = data.map((user) => (({
            id: user.cell,
            first: user.name.first,
            last: user.name.last,
        })))
        
        return{
            ...state,
        userlist: newUsers,
        isLoading: false,

        }
        
     
      
        
      })
      .addCase(getUser.rejected, (state,action) =>({
        ...state, isLoading: false,
        error:action.payload 
      }))

  }
});

// export const { getUser } = userSlice.actions;

export default userSlice.reducer;