self.onmessage = async ({ data }) => {
  // Can't import at the top level because dependencies
  // use await, which is not supported in workers
  const { webcrack } = await import('webcrack');

  try {
    const result = await webcrack(data);
    postMessage({
      success: true,
      code: result.code,
    });
  } catch (error) {
    console.error(error);
    postMessage({
      success: false,
      error: String(error),
    });
  }
};
