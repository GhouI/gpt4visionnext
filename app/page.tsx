// pages/index.tsx

import { useCallback } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { LandingComponent } from '@/components/component/landing-component';

export default function Home() {

  return (
    <div>
     <LandingComponent />
    </div>
  );
}
