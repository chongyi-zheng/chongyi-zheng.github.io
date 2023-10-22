---
layout: page
permalink: /td_infonce/
title: Contrastive Difference Predictive Coding
description: 
nav: false
nav_order: 1
---
<p><center><a href="https://chongyi-zheng.github.io/">Chongyi Zheng</a>, &emsp; <a href="https://www.cs.cmu.edu/~rsalakhu/">Ruslan Salakhutdinov</a>, &emsp; <a href="https://ben-eysenbach.github.io/">Benjamin Eysenbach</a></center></p>
<p><center><b><a href="">Paper</a>, &emsp; <a href="https://github.com/chongyi-zheng/td_infonce">Code</a></b></center></p>

<p align="center">
<img src="../assets/papers/td_infonce/images/td_cpc.png" width="90%" />
</p>

*__Abstract__*:
Predicting and reasoning about the future lies at the heart of many time-series questions. For example, goal-conditioned reinforcement learning can be viewed as learning representations to predict which states are likely to be visited in the future. While prior methods have used contrastive predictive coding to model time series data, learning representations that encode long-term dependencies usually requires large amounts of data. In this paper, we introduce a temporal difference version of contrastive predictive coding that stitching together pieces of different time series data to decrease the amount of data required to learn to predict future events. We apply this representation learning method to derive an off-policy algorithm for goal-conditioned RL. Experiments demonstrate that, compared with prior RL methods, ours achieves higher success rates with less data, and can better cope with stochastic environments.

### Evaluation on online GCRL benchmarks

**TASK:** reach

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/td_infonce/videos/td_infonce_reach.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="TD InfoNCE (Ours)" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/td_infonce/videos/qrl_reach.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="Quasimetric RL" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/td_infonce/videos/contrastive_rl_reach.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="Contrastive RL" %}
    </div>
</div>

**TASK:** push

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/td_infonce/videos/td_infonce_push.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="TD InfoNCE (Ours)" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/td_infonce/videos/qrl_push.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="Quasimetric RL" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/td_infonce/videos/contrastive_rl_push.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="Contrastive RL" %}
    </div>
</div>

**TASK:** pick and place

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/td_infonce/videos/td_infonce_pick_and_place.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="TD InfoNCE (Ours)" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/td_infonce/videos/qrl_pick_and_place.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="Quasimetric RL" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/td_infonce/videos/contrastive_rl_pick_and_place.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="Contrastive RL" %}
    </div>
</div>

**TASK:** slide

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/td_infonce/videos/td_infonce_slide.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="TD InfoNCE (Ours)" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/td_infonce/videos/qrl_slide.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="Quasimetric RL" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/td_infonce/videos/contrastive_rl_slide.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="Contrastive RL" %}
    </div>
</div>

### Evaluation on offline goal reaching

offline D4RL AntMaze benchmarks

<p align="center">
    <img src="../assets/papers/td_infonce/images/offline_eval.png" width="100%" />
</p>

### Off-policy reasoning

**Stitching trajectories in a dataset:** The behavioral policy collects "Z" style trajectories. 

<p align="center">
    <img src="../assets/papers/td_infonce/images/stitching_dataset.png" width="35%" />
</p>

Unlike the Monte Carlo method (contrastive RL) , our TD InfoNCE successfully "stitches'' these trajectories together, navigating between pairs of (start - red cross, goal - green star) states unseen in the training trajectories.

<p align="center">
    <img src="../assets/papers/td_infonce/images/stitching.png" width="90%" />
</p>


**Searching for shortcuts in skewed datasets:** Conditioned on different initial states (red cross) and goals (green star), we collect datasets with 95% long paths (dark) and 5% short paths (light). TD InfoNCE infers the shortest path, while contrastive RL fails to find this path.

<p align="center">
    <img src="../assets/papers/td_infonce/images/shortcut_searching_full.png" width="90%" />
</p>
