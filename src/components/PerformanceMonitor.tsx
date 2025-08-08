import React, {useEffect, useRef} from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface PerformanceMonitorProps {
  componentName: string;
  enabled?: boolean;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  componentName,
  enabled = __DEV__,
}) => {
  const renderCount = useRef(0);
  const mountTime = useRef(Date.now());
  const lastRenderTime = useRef(Date.now());

  useEffect(() => {
    renderCount.current += 1;
    const now = Date.now();
    const timeSinceMount = now - mountTime.current;
    const timeSinceLastRender = now - lastRenderTime.current;
    
    if (enabled) {
      console.log(`[Performance] ${componentName}:`, {
        renderCount: renderCount.current,
        timeSinceMount: `${timeSinceMount}ms`,
        timeSinceLastRender: `${timeSinceLastRender}ms`,
      });
    }
    
    lastRenderTime.current = now;
  });

  if (!enabled) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {componentName}: {renderCount.current} renders
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    padding: 4,
    borderRadius: 4,
    zIndex: 9999,
  },
  text: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default PerformanceMonitor;