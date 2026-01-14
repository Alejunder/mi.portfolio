// Module pattern: lógica del modo inmersivo 3D
export const createImmersiveMode = () => {
  let isLocked = false;

  const lockScroll = () => {
    if (isLocked) return;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    isLocked = true;
  };

  const unlockScroll = () => {
    if (!isLocked) return;
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    isLocked = false;
  };

  const getRowDepth = (rowIndex) => {
    if (rowIndex === 0) return -4;
    if (rowIndex === 1) return -1.5;
    return 0;
  };

  const calculatePosition = (index, totalCols = 3) => {
    const col = index % totalCols;
    const row = Math.floor(index / totalCols);
    const x = (col - 1) * 3.2;
    const y = -row * 3.8;
    const z = getRowDepth(row);
    return { x, y, z, row };
  };

  return {
    lockScroll,
    unlockScroll,
    getRowDepth,
    calculatePosition
  };
};
