export const simpleHandleChange = ctx => e => {
  ctx.setState({ [e.target.name]: e.target.value });
};
