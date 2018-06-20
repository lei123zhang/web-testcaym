<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <Row class="expand-row">
            <Col span="8">
                <span class="expand-key">{{$t('exchange.expand.time')}} </span>
            </Col>
            <Col span="4">
                <span class="expand-key">{{$t('exchange.expand.price')}} </span>
            </Col>
            <Col span="4">
                <span class="expand-key">{{$t('exchange.expand.amount')}} </span>
            </Col>
            <Col span="4">
              <span class="expand-key">成交额</span>
            </Col>
            <Col span="4">
                <span class="expand-key">{{$t('exchange.expand.fee')}}</span>
            </Col>
        </Row>
        <Row v-for="row in rows">
            <Col span="8">
                <span class="expand-value">{{ row.time|dateFormat }}</span>
            </Col>
            <Col span="4">
                <span class="expand-value">{{ row.price }}</span>
            </Col>
            <Col span="4">
                <span class="expand-value">{{ row.amount }}</span>
            </Col>
            <Col span="4">
            <span class="expand-value">{{ row.turnover }}</span>
            </Col>
            <Col span="4">
                <span class="expand-value">{{ row.fee }}</span>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            rows: Array
        }
    };
</script>
