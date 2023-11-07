import { create } from 'zustand'

export const usePostStore = create((set)=>({
  hlist : "",
  setHlist : (val) => set( (state) => ({ hlist : val }) ),
  plist : "",
  setPlist : (val) => set( (state) => ({ plist : val }) )
}))

export const useLoginStore = create((set)=>({
  inLogin : false,
  setInLogin : (val) => set( (state) => ({ inLogin : val }) )
}))
