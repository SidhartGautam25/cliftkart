export default function handleAsyncError(asyncFunction) {
  return function wrappedAsyncHandler(req,res,next) {
    console.log("we are at handleAsyncError function");
    const out = asyncFunction(req,res,next);
    const nextFunction = next;
    return Promise.resolve(out).catch(nextFunction);
  };
}