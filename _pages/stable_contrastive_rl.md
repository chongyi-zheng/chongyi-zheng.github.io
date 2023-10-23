---
layout: page
permalink: /stable_contrastive_rl/
title: "Stabilizing Contrastive RL: Techniques for Offline Goal Reaching"
description: 
nav: false
nav_order: 1
---
<p><center><a href="https://chongyi-zheng.github.io/">Chongyi Zheng</a>, &emsp; <a href="https://ben-eysenbach.github.io/">Benjamin Eysenbach</a>, &emsp; <a href="https://homerwalke.com/">Homer Walke</a>, &emsp; <a href="https://patrickyin.me/">Patrick Yin</a>, &emsp; <a href="https://kuanfang.github.io/">Kuan Fang</a>, <br> <a href="https://www.cs.cmu.edu/~rsalakhu/">Ruslan Salakhutdinov</a>, &emsp; <a href="https://people.eecs.berkeley.edu/~svlevine/">Sergey Levine</a></center></p>
<p><center><b><a href="https://arxiv.org/abs/2306.03346" style="font-size: 20px">Paper</a>, &emsp; <a href="https://github.com/chongyi-zheng/stable_contrastive_rl" style="font-size: 20px">Code</a></b></center></p>

<p align="center">
<img src="../assets/papers/stable_contrastive_rl/images/arch_diagram.png" width="90%" />
</p>

*__Abstract__*:
In the same way that the computer vision (CV) and natural language processing (NLP) communities have developed self-supervised methods, reinforcement learning (RL) can be cast as a self-supervised problem: learning to reach any goal, without requiring human-specified rewards or labels. However, actually building a self-supervised foundation for RL faces some important challenges. Building on prior contrastive approaches to this RL problem, we conduct careful ablation experiments and discover that a shallow and wide architecture, combined with careful weight initialization and data augmentation, can significantly boost the performance of these contrastive RL approaches on challenging simulated benchmarks. Additionally, we demonstrate that, with these design decisions, contrastive approaches can solve real-world robotic manipulation tasks, with tasks being specified by a single goal image provided after training.

### Evaluation on Real Manipulation Tasks

Below, we show examples of the behavior learned by stable contrastive RL and baselines, GC-IQL and GCBC, on the real manipulation tasks. All the methods successfully solves the simplest tasks "reach the eggplant", while stable contrastive RL achives 60% success rates on the other two tasks where baselines fail. Note that our method casts reinforcement learning as a self-supervised problem, without using any reward function and successfully solving multi-stage goal-conditioned control tasks.

**TASK:** Pick the red spoon and place it on the left of the pot.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="../assets/papers/stable_contrastive_rl/images/goal_pick_and_place_spoon.jpg" class="img-fluid rounded z-depth-1" caption="Goal" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/stable_contrastive_rl/videos/iql_pick_and_place_spoon.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="GC-IQL" %}
    </div>
</div>

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/stable_contrastive_rl/videos/gcbc_pick_and_place_spoon.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="GCBC" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/stable_contrastive_rl/videos/stable_contrastive_rl_pick_and_place_spoon.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="Stable Contrastive RL (Ours)" %}
    </div>
</div>

**TASK:** Push the can to the wall.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="../assets/papers/stable_contrastive_rl/images/goal_push_can.jpg" class="img-fluid rounded z-depth-1" caption="Goal" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/stable_contrastive_rl/videos/iql_push_can.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="GC-IQL" %}
    </div>
</div>

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/stable_contrastive_rl/videos/gcbc_push_can.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="GCBC" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/stable_contrastive_rl/videos/stable_contrastive_rl_push_can.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="Stable Contrastive RL (Ours)" %}
    </div>
</div>

**TASK:** Reach the eggplant on the table.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="../assets/papers/stable_contrastive_rl/images/goal_reach_eggplant.jpg" class="img-fluid rounded z-depth-1" caption="Goal" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/stable_contrastive_rl/videos/iql_reach_eggplant.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="GC-IQL" %}
    </div>
</div>

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/stable_contrastive_rl/videos/gcbc_reach_eggplant.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="GCBC" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/stable_contrastive_rl/videos/stable_contrastive_rl_reach_eggplant.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="Stable Contrastive RL (Ours)" %}
    </div>
</div>

### Evaluation on Simulated Manipulation Tasks

We also visualize examples of the behavior learned by stable contrastive RL and the same baselines on the simulated manipulation tasks. Stable contrastive RL is able to solve multi-stage goal-conditioned control tasks, while baselines complete single stage or fail to complete the tasks.

**TASK:** Pick the green object in the drawer, place it in the tray, and then close the drawer.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="../assets/papers/stable_contrastive_rl/images/goal_pick_and_place_drawer.png" class="img-fluid rounded z-depth-1" caption="Goal" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/stable_contrastive_rl/videos/iql_pick_and_place_drawer.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="GC-IQL" %}
    </div>
</div>

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/stable_contrastive_rl/videos/gcbc_pick_and_place_drawer.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="GCBC" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/stable_contrastive_rl/videos/stable_contrastive_rl_pick_and_place_drawer.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="Stable Contrastive RL (Ours)" %}
    </div>
</div>

**TASK:** Push the orange block on the table and then open the drawer.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="../assets/papers/stable_contrastive_rl/images/goal_push_block_open_drawer.png" class="img-fluid rounded z-depth-1" caption="Goal" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/stable_contrastive_rl/videos/iql_push_block_open_drawer.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="GC-IQL" %}
    </div>
</div>

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/stable_contrastive_rl/videos/gcbc_push_block_open_drawer.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="GCBC" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/stable_contrastive_rl/videos/stable_contrastive_rl_push_block_open_drawer.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="Stable Contrastive RL (Ours)" %}
    </div>
</div>

**TASK:** Pick the green object on the table and place it in the tray.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="../assets/papers/stable_contrastive_rl/images/goal_pick_and_place_table.png" class="img-fluid rounded z-depth-1" caption="Goal" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/stable_contrastive_rl/videos/iql_pick_and_place_table.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="GC-IQL" %}
    </div>
</div>

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/stable_contrastive_rl/videos/gcbc_pick_and_place_table.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="GCBC" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/stable_contrastive_rl/videos/stable_contrastive_rl_pick_and_place_table.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="Stable Contrastive RL (Ours)" %}
    </div>
</div>

**TASK:** Close the drawer.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="../assets/papers/stable_contrastive_rl/images/goal_drawer.png" class="img-fluid rounded z-depth-1" caption="Goal" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/stable_contrastive_rl/videos/iql_drawer.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="GC-IQL" %}
    </div>
</div>

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/stable_contrastive_rl/videos/gcbc_drawer.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="GCBC" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/stable_contrastive_rl/videos/stable_contrastive_rl_drawer.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="Stable Contrastive RL (Ours)" %}
    </div>
</div>

### Failure Cases

For the task below, the agent tries to push the orange block, but fails to close the drawer.

**TASK:** Push the orange block on the table and then close the drawer.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="../assets/papers/stable_contrastive_rl/images/goal_push_block_close_drawer.png" class="img-fluid rounded z-depth-1" caption="Goal" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="../assets/papers/stable_contrastive_rl/videos/stable_contrastive_rl_push_block_close_drawer.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true caption="Stable Contrastive RL (Ours)" %}
    </div>
</div>
