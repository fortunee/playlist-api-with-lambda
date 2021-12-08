#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { TestPlaylistApiStack } from '../lib/test-playlist-api-stack';

const app = new cdk.App();
new TestPlaylistApiStack(app, 'TestPlaylistApiStack');
