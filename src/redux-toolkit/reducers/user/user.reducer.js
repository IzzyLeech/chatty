import { createSlice } from '@reduxjs/toolkit';

const intialState = {
  token: '',
  profile: null
};

const userSlice = createSlice({
  name: 'user',
  intialState,
  reducers: {
    addUser: (state, action) => {
      const { token, profile } = action.payload;
      state.token = token;
      state.profile = profile;
    }
  }
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
